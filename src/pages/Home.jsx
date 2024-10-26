import React, { useState } from "react";
import Navbar from "../components/Navbar";
import logo from '/logo.png'; 
import ProjectCarousel from "../components/home/ProjectCarousel";
import InterviewCarousel from "../components/home/InterviewCarousel";

const proj = [
    {
      id: 1,
      title: "Project One",
      description: "An innovative solution to enhance productivity and collaboration among students.",
      image: "/1619.png", 
      link: "/project-one"
    },
    {
      id: 2,
      title: "Project Two",
      description: "A platform designed for students to share and showcase their work effectively.",
      image: "/placehol.png",
      link: "/project-two"
    },
    {
      id: 3,
      title: "Project Three",
      description: "An interactive tool for students to collaborate on projects and gather feedback.",
      image: "https://via.placeholder.com/400",
      link: "/project-three"
    }
];

const inter = [
  {
    id: 1,
    title: "Interview with John Doe",
    description: "A discussion about tech innovations in the educational sector.",
    image: "https://via.placeholder.com/400",
    link: "/interview-one"
  },
  {
    id: 2,
    title: "Interview with Jane Smith",
    description: "Insights into the startup world and how students can make an impact.",
    image: "https://via.placeholder.com/400",
    link: "/interview-two"
  },
  {
    id: 3,
    title: "Interview with Alex Johnson",
    description: "The future of software development and opportunities for students.",
    image: "https://via.placeholder.com/400",
    link: "/interview-three"
  }
];

const Home = () => {
    const [projects, setProjects] = useState(proj);
    const [interviews, setInterviews] = useState(inter);
    
    return (
      <div className="bg-raisin-black-2 text-white">
        <Navbar />
        <div className="flex flex-col p-5 items-center justify-center min-h-screen">
          <img src={logo} alt="Logo" className="h-32 mb-4 sm:h-40 md:h-48 mt-20" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center">Amico Foundation</h1>
          <p className="text-base sm:text-lg md:text-xl text-center max-w-md mb-6 px-4">
            A platform for GP students to showcase and host their projects, fostering collaboration and innovation.
          </p>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
            <a
              href="/projects"
              className="px-4 text-center py-2 sm:px-6 sm:py-2 bg-buff text-white rounded hover:bg-yellow-green transition duration-300"
            >
              Projects
            </a>
            <a
              href="/contactus"
              className="px-4 py-2 sm:px-6 sm:py-2 text-center bg-light-red text-white rounded hover:bg-yellow-green transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="p-5">
          {/* Projects Section */}
          <h2 className="text-2xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-center mb-6">Explore innovative projects hosted by GP students.</p>
          <ProjectCarousel projects={projects} />
          <div className="text-center mt-4">
            <a 
              href="/projects" 
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-300"
            >
              Show All Projects
            </a>
          </div>

          {/* Interviews Section */}
          <h2 className="text-2xl font-bold text-center mt-8 mb-4">Featured Interviews</h2>
          <p className="text-center mb-6">Gain insights from industry leaders and innovators.</p>
          <InterviewCarousel interviews={interviews} />
          <div className="text-center mt-4">
            <a 
              href="/interviews" 
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-300"
            >
              Show All Interviews
            </a>
          </div>
        </div>
      </div>
    );
};

export default Home;
