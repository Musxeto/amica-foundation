import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import logo from "/logo.png";
import ProjectCarousel from "../components/home/ProjectCarousel";
import InterviewCarousel from "../components/home/InterviewCarousel";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const proj = [
  {
    id: 1,
    title: "Project One",
    description:
      "An innovative solution to enhance productivity and collaboration among students.",
    image: "/1619.png",
    link: "/project-one",
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "A platform designed for students to share and showcase their work effectively.",
    image: "/placehol.png",
    link: "/project-two",
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "An interactive tool for students to collaborate on projects and gather feedback.",
    image: "https://via.placeholder.com/400",
    link: "/project-three",
  },
];

const inter = [
  {
    id: 1,
    interviewName: "Interview with Playboi Carti",
    interviewer: "John Doe",
    description: "A deep dive into the creative process of Playboi Carti.",
    videoLink: "https://youtu.be/oK-9Lqm-8-s?list=OLAK5uy_n5ZwE3MkjjrtedzA92tQcAS44EtzgwIqI", 
    image: "/placehol.png",
  },
  {
    id: 2,
    interviewName: "Taylor Swift: The Art of Songwriting",
    interviewer: "Jane Smith",
    description: "Taylor Swift shares her journey as a songwriter.",
    videoLink: "https://www.youtube.com/watch?v=FSzCnVBZQS0",
    image: "/placehol.png",
  },
  {
    id: 3,
    interviewName: "Behind the Scenes with Chris Evans",
    interviewer: "Alice Johnson",
    description: "Chris Evans discusses his experiences in Hollywood.",
    videoLink: "https://youtu.be/FlvQrMidE3w",
    image: "/placehol.png",
  },
  {
    id: 4,
    interviewName: "Emma Watson on Activism",
    interviewer: "Bob Brown",
    description:
      "Emma Watson talks about her role in promoting gender equality.",
    videoLink: "https://www.youtube.com/watch?v=NEFEwfPcXRA",
    image: "/placehol.png",
  },
];

const Home = () => {
  const [projects, setProjects] = useState(proj);
  const [interviews, setInterviews] = useState(inter);
  const navigate = useNavigate()
  return (
    <div className="bg-raisin-black-2 text-white">
      <Navbar />
      <div className="flex flex-col p-5 items-center justify-center min-h-screen">
        <img
          src={logo}
          alt="Logo"
          className="h-32 mb-4 sm:h-40 md:h-48 mt-20"
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center">
          Amica Foundation
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-center max-w-md mb-6 px-4">
          A platform for GP students to showcase and host their projects,
          fostering collaboration and innovation.
        </p>
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
          <button
            onClick={()=>{
              navigate("/projects")
            }}
            className="px-4 text-center py-2 sm:px-6 sm:py-2 bg-buff text-white rounded hover:bg-yellow-green transition duration-300"
          >
            Projects
          </button>
          <button
           onClick={()=>{
            navigate("/contactus")
          }}
            className="px-4 py-2 sm:px-6 sm:py-2 text-center bg-light-red text-white rounded hover:bg-yellow-green transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>

      <motion.div
        className="flex flex-col justify-center py-10 px-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Featured Projects
        </h2>
        <p className="text-center mb-8">
          Explore innovative projects hosted by GP students.
        </p>
        <ProjectCarousel projects={projects} />
        <div className="text-center mt-4">
          <a
            href="/projects"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-300"
          >
            Show All Projects
          </a>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col justify-center py-10 px-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mt-8 mb-4">Interviews</h2>
        <p className="text-center mb-8">
          Gain insights from industry leaders, innovators, and bright GP
          Students.
        </p>
        <InterviewCarousel interviews={interviews} />
        <div className="text-center mt-4">
          <a
            href="/interviews"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-300"
          >
            Show All Interviews
          </a>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col p-5 items-center  justify-center py-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-h-screen justify-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center mb-4">
            Looking for GP Students?
          </h2>
          <p className="text-center mb-6">
            If you're interested in getting your project featured or
            collaborating with GP students, feel free to reach out to us!
          </p>
          <a
            href="/contactus"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
