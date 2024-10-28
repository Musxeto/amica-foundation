import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/projects/ProjectCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectCollection = collection(db, "projects");
        const projectSnapshot = await getDocs(projectCollection);
        const projectList = projectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.students &&
        project.students.some((student) =>
          student.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  // Sort projects based on selected option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "school") return a.school.localeCompare(b.school);
    return 0;
  });

  return (
    <div className="bg-raisin-black-2 text-white">
      <Navbar />
      <div className="min-h-screen mt-16 p-8">
        <h1 className="text-4xl text-buff-500 font-bold text-center mb-4">
          Projects
        </h1>
        <p className="text-raisin-black-800 text-xl text-center mb-6">
          Great projects by our amazing students and schools.
        </p>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            className="bg-raisin-black-400 p-2 rounded-md text-white w-full md:w-1/3 mb-4 md:mb-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="bg-raisin-black-400 p-2 rounded-md text-white w-full md:w-1/4"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Project Name</option>
            <option value="school">School</option>
          </select>
        </div>

        {/* Loading Indicator or Project Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="text-buff-500 text-5xl animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
