import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";

const EditInterviewModal = ({ interview, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [interviewName, setInterviewName] = useState(interview.interviewName || "");
  const [interviewer, setInterviewer] = useState(interview.interviewer || "");
  const [description, setDescription] = useState(interview.description || "");
  const [videoLink, setVideoLink] = useState(interview.videoLink || "");

  const handleUpdateInterview = async () => {
    setLoading(true);
    try {
      const interviewRef = doc(db, "interviews", interview.id);
      const updatedInterview = {
        interviewName,
        interviewer,
        description,
        videoLink,
      };

      await updateDoc(interviewRef, updatedInterview);
      onUpdate({ ...interview, ...updatedInterview });
      toast.success("Interview updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Error updating interview.");
      console.error("Error updating interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-raisin-black-500 p-6 rounded-lg shadow-lg text-white max-w-[90%] sm:max-w-md md:max-w-lg w-full overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-semibold mb-4">Edit Interview</h2>

        <div className="mb-4">
          <label className="block mb-1">Interview Title</label>
          <input
            type="text"
            value={interviewName}
            onChange={(e) => setInterviewName(e.target.value)}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Interviewer Name</label>
          <input
            type="text"
            value={interviewer}
            onChange={(e) => setInterviewer(e.target.value)}
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
          <label className="block mb-1">Video Link</label>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateInterview}
            className={`bg-blue-500 px-3 py-1 rounded hover:bg-blue-400 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? <FiLoader className="animate-spin" /> : "Update Interview"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInterviewModal;
