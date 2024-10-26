import React, { useState } from "react";
import Navbar from "../components/Navbar";
import logo from '/logo.png'; 
import ProjectCarousel from "../components/home/ProjectCarousel";

const proj = [
    {
      id: 1,
      title: "Project One",
      description: "This is a brief description of Project One.",
      image: "/1619.png", 
      link: "/project-one"
    },
    {
      id: 2,
      title: "Project Two",
      description: "This is a brief description of Project Two.",
      image: "/placehol.png",
      link: "/project-two"
    },
    {
      id: 3,
      title: "Project Three",
      description: "This is a brief description of Project Three.",
      image: "https://via.placeholder.com/400",
      link: "/project-three"
    }
];

const Home = () => {
    const [projects, setProjects] = useState(proj);
    
    return (
      <div className="bg-raisin-black-2 text-white">
        <Navbar />
        <div className="flex flex-col p-5 items-center justify-center min-h-screen">
          <img src={logo} alt="Logo" className="h-32 mb-4 sm:h-40 md:h-48 mt-20" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center">Amico Foundation</h1>
          <p className="text-base sm:text-lg md:text-xl text-center max-w-md mb-6 px-4">
            We strive to make a difference in our community through various projects and initiatives.
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
           <ProjectCarousel projects={projects} />
        </div>
       
      </div>
    );
};

export default Home;
