import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditProjectModal from "../../components/admin/EditProjectModal";
import DeleteWarningModal from "../../components/admin/DeleteWarningModal";
import { toast } from "react-toastify";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectCollection = collection(db, "projects");
      const projectSnapshot = await getDocs(projectCollection);
      const projectList = projectSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      toast.success("Project deleted successfully!");
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    } catch (error) {
      toast.error("Error deleting project.");
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (project) => {
    setEditProject(project);
  };

  const closeEditModal = () => {
    setEditProject(null);
  };

  const confirmDelete = () => {
    if (deleteProjectId) {
      handleDeleteProject(deleteProjectId);
      setDeleteProjectId(null);
    }
  };

  return (
    <div className="min-h-screen bg-raisin-black-2">
      <AdminNavbar />
      <h2 className="text-3xl mt-16 text-white text-center my-4">Manage Projects</h2>
      <div className="grid grid-cols-1 justify-center gap-4 p-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-raisin-black-500 rounded-lg p-4 shadow-md w-full max-w-xs">
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="text-gray-300">{project.shortDescription}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEditProject(project)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteProjectId(project.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={closeEditModal}
          onRefresh={() => setProjects(prev => prev.map(p => (p.id === editProject.id ? editProject : p)))}
        />
      )}

      {deleteProjectId && (
        <DeleteWarningModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteProjectId(null)}
        />
      )}
    </div>
  );
};

export default ManageProjects;
