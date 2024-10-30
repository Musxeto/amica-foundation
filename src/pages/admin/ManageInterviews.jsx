import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditInterviewModal from "../../components/admin/EditInterviewModal";
import DeleteWarningModal from "../../components/admin/DeleteWarningModal";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const ManageInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [editInterview, setEditInterview] = useState(null);
  const [deleteInterviewId, setDeleteInterviewId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchInterviews = async () => {
      setLoading(true);
      try {
        const interviewCollection = collection(db, "interviews");
        const interviewSnapshot = await getDocs(interviewCollection);
        const interviewList = interviewSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInterviews(interviewList);
      } catch (error) {
        toast.error("Error loading interviews.");
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleDeleteInterview = async (id) => {
    try {
      await deleteDoc(doc(db, "interviews", id));
      toast.success("Interview deleted successfully!");
      setInterviews(prevInterviews => prevInterviews.filter(interview => interview.id !== id));
    } catch (error) {
      toast.error("Error deleting interview.");
      console.error("Error deleting interview:", error);
    }
  };

  const handleEditInterview = (interview) => {
    setEditInterview(interview);
  };

  const closeEditModal = () => {
    setEditInterview(null);
  };

  const confirmDelete = () => {
    if (deleteInterviewId) {
      handleDeleteInterview(deleteInterviewId);
      setDeleteInterviewId(null);
    }
  };

  // Filter and sort interviews based on the search query and sort order
  const filteredInterviews = interviews
    .filter(interview =>
      interview.interviewName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.interviewName.toLowerCase();
      const nameB = b.interviewName.toLowerCase();
      if (sortOrder === "asc") return nameA < nameB ? -1 : 1;
      return nameA > nameB ? -1 : 1;
    });

  return (
    <div className="min-h-screen bg-raisin-black-2">
      <AdminNavbar />
      <h2 className="text-3xl mt-16 text-white text-center p-4">Manage Interviews</h2>

      {/* Search and Sort Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search interviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 rounded bg-raisin-black-400 border border-raisin-black-600 text-white"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort {sortOrder === "asc" ? "↓" : "↑"}
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <FaSpinner className="text-buff-500 text-5xl animate-spin" />
        </div>
      ) : (
        <div className="p-4">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className="bg-raisin-black-500 p-4 shadow-md rounded-lg w-full mb-4">
              <h3 className="text-lg font-semibold text-white">{interview.interviewName}</h3>
              <p className="text-gray-300">{interview.interviewer}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEditInterview(interview)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteInterviewId(interview.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {editInterview && (
        <EditInterviewModal
          interview={editInterview}
          onClose={closeEditModal}
          onUpdate={(updatedInterview) => {
            setInterviews(prevInterviews =>
              prevInterviews.map(i => (i.id === updatedInterview.id ? updatedInterview : i))
            );
            closeEditModal();
          }}
        />
      )}

      {deleteInterviewId && (
        <DeleteWarningModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteInterviewId(null)}
        />
      )}
    </div>
  );
};

export default ManageInterviews;
