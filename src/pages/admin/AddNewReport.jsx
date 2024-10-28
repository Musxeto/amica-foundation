import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AddNewReport = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [pdf, setPdf] = useState(null);

  const handlePdfUpload = async (file) => {
    try {
      const storageRef = ref(storage, `reports/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPdf(url);
      toast.success("PDF uploaded successfully.");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Error uploading PDF.");
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Report title is required.");
      return false;
    }
    if (!description.trim()) {
      toast.error("Description is required.");
      return false;
    }
    if (!uploadedBy.trim()) {
      toast.error("Uploader name is required.");
      return false;
    }
    if (!pdf) {
      toast.error("PDF document is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const reportData = { title, description, uploadedBy, pdf };
      await addDoc(collection(db, "reports"), reportData);
      toast.success("Report added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding report:", error);
      toast.error("Error adding report.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUploadedBy("");
    setPdf(null);
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col min-h-screen py-16 bg-raisin-black-2 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-raisin-black-500 mt-20 p-8 rounded-lg shadow-lg shadow-light-red w-full max-w-lg text-white"
        >
          <ToastContainer />
          <h2 className="text-2xl font-bold mb-4 text-center">Add New Report</h2>

          <div className="mb-4">
            <label className="block mb-1">Report Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 bg-raisin-black-400 border border-raisin-black-600 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 bg-raisin-black-400 border border-raisin-black-600 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Uploaded By</label>
            <input
              type="text"
              value={uploadedBy}
              onChange={(e) => setUploadedBy(e.target.value)}
              required
              className="w-full p-2 bg-raisin-black-400 border border-raisin-black-600 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">PDF Document</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handlePdfUpload(e.target.files[0])}
              className="p-1 bg-raisin-black-400 border border-raisin-black-600 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 mt-4 bg-light-red-500 text-white rounded hover:bg-light-red-600"
          >
            {loading ? "Uploading..." : "Add Report"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNewReport;
