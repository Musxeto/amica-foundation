import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/projects/ProjectCard';

const projectsData = [
  {
    id: 1,
    name: "AI-Powered Attendance System",
    shortDescription: "A facial recognition attendance system to streamline school attendance...",
    longDescription: "This project involves using machine learning models for accurate attendance...",
    images: ["1619.png", "placehol.png"],
    students: ["Playboi Carti", "Taylor Swift"],
    school: "Green Valley High School"
  },
  {
    id: 2,
    name: "Smart Agriculture Monitor",
    shortDescription: "An IoT-based project for real-time monitoring of soil health...",
    longDescription: "The Smart Agriculture Monitor uses sensors to gather data on soil moisture...",
    images: ["1619.png", "placehol.png"],
    students: ["Lil Uzi Vert", "Kanye South"],
    school: "Izne ka School"
  },
  {
    id: 3,
    name: "Eco-Friendly Waste Management",
    shortDescription: "A project aimed at optimizing waste collection processes...",
    longDescription: "Utilizes machine learning to predict waste generation patterns...",
    images: ["placehol.png"],
    students: ["John Doe"],
    school: "City High School"
  },
  {
    id: 4,
    name: "Remote Health Monitoring",
    shortDescription: "An IoT project for monitoring patients remotely...",
    longDescription: "The system collects health data and sends alerts to doctors...",
    images: ["placehol.png"],
    // Missing students field for demonstration
    school: "Healthcare University"
  },
  {
    id: 5,
    name: "Virtual Reality Learning Environment",
    shortDescription: "A VR project that enhances student learning experiences...",
    longDescription: "Integrates VR technology to create immersive learning modules...",
    images: ["placehol.png"],
    students: ["Alice Johnson", "Bob Brown"],
    school: "Tech Academy"
  },
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [projects, setProjects] = useState(projectsData);

  // Filter projects based on search query
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.students && project.students.some(student => student.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Sort projects based on selected option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'school') return a.school.localeCompare(b.school);
    return 0;
  });

  return (
    <div className="bg-raisin-black-2 text-white">
      <Navbar />
      <div className="min-h-screen mt-10 p-8">
        <h1 className="text-3xl text-buff-500 font-bold mb-4">Projects</h1>
        <p className="text-raisin-black-800 mb-6">Great projects by our amazing students and schools.</p>
        
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

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
