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
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter projects based on the search query
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-raisin-black-2">
      <AdminNavbar />
      <h2 className="text-3xl mt-16  text-white text-center p-4">Manage Projects</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 rounded bg-raisin-black-400 border border-raisin-black-600 text-white"
        />
      </div>

      {/* Project List */}
      <div className="p-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-raisin-black-500 p-4 shadow-md rounded-lg w-full mb-4">
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <div className="flex justify-between mt-2">
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

      {/* Modals */}
      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={closeEditModal}
          onUpdate={(updatedProject) => {
            setProjects(prevProjects =>
              prevProjects.map(p => (p.id === updatedProject.id ? updatedProject : p))
            );
            closeEditModal();
          }}
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
