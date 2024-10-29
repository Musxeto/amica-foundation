import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";

const EditProjectModal = ({ project, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(project.name || "");
  const [shortDescription, setShortDescription] = useState(
    project.shortDescription || ""
  );
  const [school, setSchool] = useState(project.school || "");
  const [students, setStudents] = useState(project.students || []);
  const [content, setContent] = useState(project.content || []);
  const [pdf, setPdf] = useState(project.pdf || null);
  const [images, setImages] = useState(project.images || []);

  useEffect(() => {
    // Initialize state with project data on component mount
    setName(project.name || "");
    setShortDescription(project.shortDescription || "");
    setSchool(project.school || "");
    setStudents(project.students || []);
    setContent(project.content || []);
    setPdf(project.pdf || null);
    setImages(project.images || []);
  }, [project]);

  const handleFileUpload = async (file, setStateCallback) => {
    if (!file) return;
    try {
      const storageRef = ref(
        storage,
        `${file.type === "application/pdf" ? "pdfs" : "images"}/${file.name}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log(`Uploaded file: ${url}`); // Debug log
      setStateCallback(url);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file.");
    }
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log(`Uploaded image: ${url}`); // Debug log
      handleContentChange(index, "text", url); // Assuming you want to save the URL as text in content
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    }
  };

  const handleUpdateProject = async () => {
    setLoading(true);
    try {
      const projectRef = doc(db, "projects", project.id);
      const updatedProject = {
        name,
        shortDescription,
        school,
        students,
        content,
        pdf,
        images,
      };

      console.log("Updating project with data:", updatedProject); // Debug log
      // Update the project in Firestore
      await updateDoc(projectRef, updatedProject);
      onUpdate({ ...project, ...updatedProject });
      toast.success("Project updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Error updating project.");
      console.error("Error updating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (index, field, value) => {
    const newContent = content.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setContent(newContent);
  };

  const addContentSection = (type) => {
    setContent([...content, { type, text: "" }]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-raisin-black-500 p-6 rounded-lg shadow-lg text-white max-w-[90%] sm:max-w-md md:max-w-lg w-full overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-semibold mb-4">Edit Project</h2>

        <div className="mb-4">
          <label className="block mb-1">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Short Description</label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">School</label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full p-2 rounded bg-raisin-black-400 border border-raisin-black-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Students (Press Enter to add)</label>
          <div className="flex flex-wrap gap-2 bg-raisin-black-400 p-2 rounded">
            {students.map((student, index) => (
              <span
                key={index}
                className="bg-gray-700 px-2 py-1 rounded flex items-center"
              >
                {student}
                <button
                  type="button"
                  onClick={() =>
                    setStudents(students.filter((_, i) => i !== index))
                  }
                  className="ml-2 text-red-500 font-bold"
                >
                  x
                </button>
              </span>
            ))}
            <input
              type="text"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                e.target.value &&
                setStudents([...students, e.target.value])
              }
              className="bg-raisin-black-400 border-none rounded focus:ring-0"
              placeholder="Add student..."
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Content (Text/Image URLs)</label>
          {content.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Content text or image URL"
                value={item.text}
                onChange={(e) =>
                  handleContentChange(index, "text", e.target.value)
                }
                className="w-full p-2 bg-raisin-black-400 border rounded"
              />
              <input
                type="file"
                onChange={(e) => handleImageUpload(index, e.target.files[0])}
                className="bg-raisin-black-400 p-2 rounded"
              />
            </div>
          ))}
          <button
            onClick={() => addContentSection("text")}
            className="bg-blue-500 px-3 py-1 rounded mt-2 hover:bg-blue-400"
          >
            Add Content
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1">PDF Document</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e.target.files[0], setPdf)}
            className="w-full p-2 bg-raisin-black-400 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Images</label>
          {images.map((img, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={img}
                placeholder="Image URL"
                readOnly
                className="w-full p-2 bg-raisin-black-400 border rounded"
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileUpload(e.target.files[0], (url) =>
                setImages([...images, url])
              )
            }
            className="w-full p-2 bg-raisin-black-400 border rounded mt-2"
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
            onClick={handleUpdateProject}
            className={`bg-blue-500 px-3 py-1 rounded hover:bg-blue-400 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? <FiLoader className="animate-spin" /> : "Update Project"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
