import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import { Viewer } from "@react-pdf-viewer/core";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Show loading spinner
      const projectCollection = collection(db, "projects");
      const projectSnapshot = await getDocs(projectCollection);
      const projectList = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const foundProject = projectList.find((project) => project.id === id);
      setProject(foundProject || null);
      setLoading(false); // Hide loading spinner once data is fetched
    };

    fetchProjects();
  }, [id]);

  return (
    <div className="bg-raisin-black-2 text-white">
      <Navbar />
      <div className="min-h-screen mt-16 p-4 md:p-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="text-buff-500 text-5xl animate-spin" />
          </div>
        ) : project ? (
          <div className="project-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <h1 className="text-3xl text-buff-500 font-bold">{project.name}</h1>
                <p className="text-gray-400 mt-2">{project.shortDescription}</p>
                <div className="pt-5">
                  <h2 className="text-xl py-3 font-semibold">Students</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.students &&
                      project.students.map((student, index) => (
                        <span
                          key={index}
                          className="bg-yellow-green-500 text-raisin-black-100 text-sm px-2 py-1 rounded-full"
                        >
                          {student}
                        </span>
                      ))}
                  </div>
                  <div>
                    <h2 className="text-xl py-3 font-semibold">
                      School :{" "}
                      <span className="text-raisin-black-700">{project.school}</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div>
                <Carousel
                  additionalTransitions={0}
                  arrows
                  autoPlay
                  autoPlaySpeed={3000}
                  infinite
                  responsive={{
                    superLargeDesktop: {
                      breakpoint: { max: 4000, min: 3000 },
                      items: 1,
                    },
                    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
                    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
                    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                  }}
                >
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={project.name}
                      className="w-full h-72 object-cover rounded-md"
                    />
                  ))}
                </Carousel>
              </div>
            </div>

            {/* Render the project content */}
            <div className="mt-8">
              {Array.isArray(project.content) &&
                project.content.map((block, blockIndex) => {
                  switch (block.type) {
                    case "heading":
                      return (
                        <h4 key={blockIndex} className="font-bold mt-4">
                          {block.text}
                        </h4>
                      );
                    case "subheading":
                      return (
                        <h5 key={blockIndex} className="font-bold mt-4">
                          {block.text}
                        </h5>
                      );
                    case "paragraph":
                      return (
                        <p key={blockIndex} className="mt-2">
                          {block.text}
                        </p>
                      );
                    case "image":
                      return (
                        <img
                          key={blockIndex}
                          src={block.text}
                          alt={block.alt}
                          className="h-36 w-auto object-cover my-8 rounded-md"
                        />
                      );
                    case "list":
                      return (
                        <li key={blockIndex} className="mt-1">
                          {block.text}
                        </li>
                      );
                    case "quote":
                      return (
                        <blockquote
                          key={blockIndex}
                          className="border-l-4 border-gray-300 pl-4 italic my-2"
                        >
                          {block.text}
                        </blockquote>
                      );
                    default:
                      return null;
                  }
                })}
            </div>

            {/* PDF Viewer */}
            {project.pdf && (
              <div className="my-8 flex justify-center">
                <div
                  className="pdf-viewer-container w-full max-w-4xl mx-auto"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Viewer fileUrl={project.pdf} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center">Project not found</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectPage;
