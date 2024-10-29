import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase"; // Make sure to import storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary functions
import { toast } from "react-toastify";

const EditReportModal = ({ report, onClose, onUpdate }) => {
  const [title, setTitle] = useState(report.title || "");
  const [description, setDescription] = useState(report.description || "");
  const [uploadedBy, setUploadedBy] = useState(report.uploadedBy || "");
  const [pdf, setPdf] = useState(report.pdf || null); // State for PDF
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    setTitle(report.title || "");
    setDescription(report.description || "");
    setUploadedBy(report.uploadedBy || "");
    setPdf(report.pdf || null); // Update PDF state
  }, [report]);

  const handleFileUpload = async (file) => {
    if (!file) return;
    try {
    setLoading(true)
      const storageRef = ref(storage, `pdfs/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log(`Uploaded PDF: ${url}`);
      setPdf(url); 
      setLoading(false)
      return url; 
     
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Error uploading PDF.");
      return null;
    }
  };

  const handleUpdateReport = async () => {
    setLoading(true);
    try {
      const reportRef = doc(db, "reports", report.id);
      const updatedPdfUrl = pdf ? pdf : report.pdf; // Use existing PDF if no new upload
      const updatedReport = {
        title,
        description,
        uploadedBy,
        pdf: updatedPdfUrl,
      };

      console.log("Updating report with:", updatedReport);

      await updateDoc(reportRef, updatedReport);
      onUpdate({ ...report, ...updatedReport });
      toast.success("Report updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Error updating report.");
      console.error("Error updating report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-raisin-black-500 p-6 rounded-lg shadow-lg text-white max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Report</h2>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Uploaded By</label>
          <input
            type="text"
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Upload PDF Document</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={async (e) => {
              const newPdfUrl = await handleFileUpload(e.target.files[0]);
              if (newPdfUrl) {
                setPdf(newPdfUrl); // Update PDF state with new URL
              }
            }}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdateReport}
            disabled={loading} // Disable button while loading
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update"}{" "}
            {/* Change button text while loading */}
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReportModal;
