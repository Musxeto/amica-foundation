import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/projects/ProjectCard';

const projectsData =  [
  {
    id: 1,
    name: "AI-Powered Attendance System",
    shortDescription: "A facial recognition attendance system to streamline school attendance...",
    content: [
      { type: "heading", text: "Overview" },
      { type: "paragraph", text: "This project involves using machine learning models for accurate attendance." },
      { type: "subheading", text: "Features" },
      { type: "list", items: ["Real-time attendance tracking", "Facial recognition technology", "User-friendly interface"] },
      { type: "image", text: "/1619.png", alt: "AI Attendance System" },
    ],
    pdf: "/react.pdf",
    images: ["/1619.png", "/placehol.png"],
    students: ["Playboi Carti", "Taylor Swift"],
    school: "Green Valley High School",
  },
  {
    id: 2,
    name: "E-Commerce Platform",
    shortDescription: "A dynamic e-commerce site with various features...",
    content: [
      { type: "heading", text: "Overview" },
      { type: "paragraph", text: "This project provides a platform for users to buy and sell products." },
      { type: "subheading", text: "Features" },
      { type: "list", items: ["Product browsing", "Shopping cart", "User authentication"] },
      { type: "image", text: "/1619.png", alt: "E-Commerce Platform" },
    ],
    pdf: "/react.pdf",
    images: ["/1619.png", "/placehol.png"],
    students: ["John Doe", "Jane Smith"],
    school: "Tech University",
  },
  {
    id: 3,
    name: "Music Streaming Service",
    shortDescription: "A platform for streaming music with personalized playlists...",
    content: [
      { type: "heading", text: "Overview" },
      { type: "paragraph", text: "This project allows users to stream music and create playlists." },
      { type: "subheading", text: "Features" },
      { type: "list", items: ["User playlists", "Song recommendations", "Search functionality"] },
      { type: "image", text: "/m1619.png", alt: "Music Streaming Service" },
    ],
    pdf: "/react.pdf",
    images: ["/1619.png", "/placehol.png"],
    students: ["Alice Johnson", "Bob Brown"],
    school: "Music Academy",
  },
  {
    id: 4,
    name: "Fitness Tracker App",
    shortDescription: "An app designed to track fitness activities...",
    content: [
      { type: "heading", text: "Overview" },
      { type: "paragraph", text: "This project helps users track their workouts and progress." },
      { type: "subheading", text: "Features" },
      { type: "list", items: ["Activity logging", "Progress charts", "Goal setting"] },
      { type: "image", text: "/m1619.png", alt: "Music Streaming Service" },
    ],
    pdf: "/react.pdf",
    images: ["/1619.png", "/placehol.png"],
    students: ["Chris Evans", "Scarlett Johansson"],
    school: "Fitness Institute",
  },
  {
    id: 5,
    name: "Recipe Management System",
    shortDescription: "A web application to manage and share recipes...",
    content: [
      { type: "heading", text: "Overview" },
      { type: "paragraph", text: "This project allows users to create and share their favorite recipes." },
      { type: "subheading", text: "Features" },
      { type: "list", items: ["Recipe categorization", "User profiles", "Rating system"] },
      { type: "image", text: "/m1619.png", alt: "Music Streaming Service" },
    ],
    pdf: "/react.pdf",
    images: ["/1619.png", "/placehol.png"],
    students: ["Emma Watson", "Daniel Radcliffe"],
    school: "Culinary School",
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
      <div className="min-h-screen mt-16 p-8">
        <h1 className="text-4xl text-buff-500 font-bold text-center mb-4">Projects</h1>
        <p className="text-raisin-black-800 text-xl text-center mb-6">Great projects by our amazing students and schools.</p>
        
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
