import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import AdminNavbar from "../../components/admin/AdminNavbar";
import "react-toastify/dist/ReactToastify.css";

const AddNewProject = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [school, setSchool] = useState("");
  const [students, setStudents] = useState([]);
  const [content, setContent] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [images, setImages] = useState([]);
  const [externalImages, setExternalImages] = useState([]);

  const addContentSection = (type) => {
    setContent([...content, { type, text: "" }]);
  };

  const handleContentChange = (index, field, value) => {
    const newContent = content.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setContent(newContent);
  };

  const handleImageUpload = async (index, file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      handleContentChange(index, "text", url);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    }
  };

  const addExternalImageInput = () => {
    setExternalImages([...externalImages, null]);
  };

  const handleExternalImageUpload = async (index, file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const updatedImages = [...images];
      updatedImages[index] = url;
      setImages(updatedImages);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    }
  };
  const handlePdfUpload = async (file) => {
    try {
      const storageRef = ref(storage, `pdfs/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPdf(url);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Error uploading PDF.");
    }
  };

  const handleTagAddition = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setStudents([...students, e.target.value]);
      e.target.value = "";
    }
  };

  const handleTagRemove = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Project name is required.");
      return false;
    }
    if (!shortDescription.trim()) {
      toast.error("Short description is required.");
      return false;
    }
    if (!school.trim()) {
      toast.error("School is required.");
      return false;
    }
    if (students.length === 0) {
      toast.error("At least one student must be added.");
      return false;
    }
    if (content.length === 0) {
      toast.error("At least one content section is required.");
      return false;
    }
    if (!pdf) {
      toast.error("A PDF document is required.");
      return false;
    }
    if (images.length === 0) {
      toast.error("At least one image is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const projectData = {
        name,
        shortDescription,
        content,
        pdf,
        images,
        students,
        school,
      };

      await addDoc(collection(db, "projects"), projectData);
      toast.success("Project added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Error adding project.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setShortDescription("");
    setSchool("");
    setStudents([]);
    setContent([]);
    setPdf(null);
    setImages([]);
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
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Project
          </h2>

          <div className="mb-4">
            <label className="block mb-1">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 bg-raisin-black-400 border border-raisin-black-600 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Short Description</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              className="w-full p-2 bg-raisin-black-400 border border-raisin-black-600 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1">School</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
              className="w-full p-2 bg-raisin-black-400 border border-raisin-black-600 rounded"
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
                    onClick={() => handleTagRemove(index)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    x
                  </button>
                </span>
              ))}
              <input
                type="text"
                onKeyDown={handleTagAddition}
                className="bg-raisin-black-400 border-none rounded focus:ring-0"
                placeholder="Add student..."
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Content</label>
            {content.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <select
                  value={item.type}
                  onChange={(e) =>
                    handleContentChange(index, "type", e.target.value)
                  }
                  className="mr-2 p-1 bg-raisin-black-400 border border-raisin-black-600 rounded"
                >
                  <option value="heading">Heading</option>
                  <option value="subheading">Subheading</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="list">List</option>
                  <option value="image">Image</option>
                </select>

                {item.type === "image" ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(index, e.target.files[0])
                    }
                    className="p-1 bg-raisin-black-400 border border-raisin-black-600 rounded"
                  />
                ) : (
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) =>
                      handleContentChange(index, "text", e.target.value)
                    }
                    placeholder="Enter content..."
                    className="p-1 bg-raisin-black-400 border border-raisin-black-600 rounded w-full"
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addContentSection("heading")}
              className="mt-2 bg-light-red-500 text-white p-2 rounded"
            >
              Add Section
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-1">External Images</label>
            {externalImages.map((_, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleExternalImageUpload(index, e.target.files[0])
                  }
                  className="p-1 bg-raisin-black-400 border border-raisin-black-600 rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addExternalImageInput}
              className="ml-2 p-2 bg-light-red-500 text-white rounded"
            >
              Add More Images
            </button>
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
            {loading ? (
              <FiLoader className="animate-spin mx-auto" />
            ) : (
              "Add Project"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNewProject;
