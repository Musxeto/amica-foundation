import React, { useState } from "react";
import { db, storage } from "../../firebase"; // Make sure to import your Firebase setup
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AddNewInterview = () => {
  const [loading, setLoading] = useState(false);
  const [interviewName, setInterviewName] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = async (file) => {
    try {
      const storageRef = ref(storage, `interviews/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    }
  };

  const validateForm = () => {
    if (!interviewName.trim()) {
      toast.error("Interview name is required.");
      return false;
    }
    if (!interviewer.trim()) {
      toast.error("Interviewer name is required.");
      return false;
    }
    if (!description.trim()) {
      toast.error("Description is required.");
      return false;
    }
    if (!videoLink.trim()) {
      toast.error("Video link is required.");
      return false;
    }
    if (!image) {
      toast.error("An image is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const imageUrl = await handleImageUpload(image); // Upload the image first
      const interviewData = {
        interviewName,
        interviewer,
        description,
        videoLink,
        image: imageUrl, // Save the uploaded image URL
      };

      await addDoc(collection(db, "interviews"), interviewData);
      toast.success("Interview added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding interview:", error);
      toast.error("Error adding interview.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setInterviewName("");
    setInterviewer("");
    setDescription("");
    setVideoLink("");
    setImage(null);
  };

  return (
    <>
      <AdminNavbar />
      <ToastContainer />
      <div className="flex flex-col min-h-screen py-16 bg-raisin-black-2 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-raisin-black-500 mt-20 p-8 rounded-lg shadow-lg shadow-light-red w-full max-w-lg text-white"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Interview
          </h2>

          <div className="mb-4">
            <label className="block mb-1">Interview Name</label>
            <input
              type="text"
              value={interviewName}
              onChange={(e) => setInterviewName(e.target.value)}
              required
              className="w-full p-2 bg-raisin-black-400 border border-raisin-black-600 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Interviewer</label>
            <input
              type="text"
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
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
            <label className="block mb-1">Video Link</label>
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              required
              className="w-full p-2 bg-raisin-black-400 border border-raisin-black-600 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Interview Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="p-1 bg-raisin-black-400 border border-raisin-black-600 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 mt-4 bg-light-red-500 text-white rounded hover:bg-light-red-600"
          >
            {loading ? (
              <FiLoader className="animate-spin mx-auto" />
            ) : (
              "Add Interview"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNewInterview;
