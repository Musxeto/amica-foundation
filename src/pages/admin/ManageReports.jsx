import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditReportModal from "../../components/admin/EditReportModal";
import DeleteWarningModal from "../../components/admin/DeleteWarningModal";
import { toast } from "react-toastify";

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [editReport, setEditReport] = useState(null);
  const [deleteReportId, setDeleteReportId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      const reportCollection = collection(db, "reports");
      const reportSnapshot = await getDocs(reportCollection);
      const reportList = reportSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportList);
    };

    fetchReports();
  }, []);

  const handleDeleteReport = async (id) => {
    try {
      await deleteDoc(doc(db, "reports", id));
      toast.success("Report deleted successfully!");
      setReports(prevReports => prevReports.filter(report => report.id !== id));
    } catch (error) {
      toast.error("Error deleting report.");
      console.error("Error deleting report:", error);
    }
  };

  const handleEditReport = (report) => {
    setEditReport(report);
  };

  const closeEditModal = () => {
    setEditReport(null);
  };

  const confirmDelete = () => {
    if (deleteReportId) {
      handleDeleteReport(deleteReportId);
      setDeleteReportId(null);
    }
  };

  // Filter reports based on the search query
  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-raisin-black-2">
      <AdminNavbar />
      <h2 className="text-3xl mt-16 text-white text-center p-4">Manage Reports</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search reports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 rounded bg-raisin-black-400 border border-raisin-black-600 text-white"
        />
      </div>

      {/* Report List */}
      <div className="p-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-raisin-black-500 p-4 shadow-md rounded-lg w-full mb-4">
            <h3 className="text-lg font-semibold text-white">{report.title}</h3>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEditReport(report)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteReportId(report.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {editReport && (
        <EditReportModal
          report={editReport}
          onClose={closeEditModal}
          onUpdate={(updatedReport) => {
            setReports(prevReports =>
              prevReports.map(r => (r.id === updatedReport.id ? updatedReport : r))
            );
            closeEditModal();
          }}
        />
      )}

      {deleteReportId && (
        <DeleteWarningModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteReportId(null)}
        />
      )}
    </div>
  );
};

export default ManageReports;
