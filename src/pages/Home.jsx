import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import logo from "/logo.png";
import ProjectCarousel from "../components/home/ProjectCarousel";
import InterviewCarousel from "../components/home/InterviewCarousel";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingInterviews, setLoadingInterviews] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectCollection = collection(db, "projects");
      const projectSnapshot = await getDocs(projectCollection);
      const projectList = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjects(projectList);
      setLoadingProjects(false);
    };

    const fetchInterviews = async () => {
      const interviewsCollection = collection(db, "interviews");
      const interviewsSnapshot = await getDocs(interviewsCollection);
      const interviewsList = interviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInterviews(interviewsList);
      setLoadingInterviews(false);
    };

    fetchProjects();
    fetchInterviews();
  }, []);

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
          Providing a platform for progress towards improving the Pakistani
          environment. Working in healthcare, animal welfare, envronment, and
          human rights.
        </p>
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
          <button
            onClick={() => {
              navigate("/projects");
            }}
            className="px-4 text-center py-2 sm:px-6 sm:py-2 bg-buff text-white rounded hover:bg-yellow-green transition duration-300"
          >
            Projects
          </button>
          <button
            onClick={() => {
              navigate("/contactus");
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
        {loadingProjects ? (
          <div className="text-center justify-center flex text-white">
            <FaSpinner className="animate-spin" />
          </div>
        ) : (
          <ProjectCarousel projects={projects} />
        )}
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
          Insights from our leaders and innovators. Conducted by us, catered to
          you.
        </p>
        {loadingInterviews ? (
          <div className="text-center justify-center flex text-white">
            <FaSpinner className="animate-spin" />
          </div>
        ) : (
          <InterviewCarousel interviews={interviews} />
        )}
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
          <h2 className="text-2xl font-bold text-center mb-4">Work with us</h2>
          <p className="text-center mb-6">
            Looking to get your work published, supported, or collaborated?
          </p>
          <p className="text-center mb-6">Send us a message</p>
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
