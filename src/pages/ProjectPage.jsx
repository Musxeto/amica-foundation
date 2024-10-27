import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import { Viewer, Worker } from "@react-pdf-viewer/core";

const projectsData = [
  {
    id: 1,
    name: "AI-Powered Attendance System",
    shortDescription:
      "A facial recognition attendance system to streamline school attendance...",
    content: [
      { type: "heading", text: "Overview" },
      {
        type: "paragraph",
        text: "This project involves using machine learning models for accurate attendance.",
      },
      { type: "subheading", text: "Features" },
      {
        type: "list",
        items: [
          "Real-time attendance tracking",
          "Facial recognition technology",
          "User-friendly interface",
        ],
      },
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
      {
        type: "paragraph",
        text: "This project provides a platform for users to buy and sell products.",
      },
      { type: "subheading", text: "Features" },
      {
        type: "list",
        items: ["Product browsing", "Shopping cart", "User authentication"],
      },
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
    shortDescription:
      "A platform for streaming music with personalized playlists...",
    content: [
      { type: "heading", text: "Overview" },
      {
        type: "paragraph",
        text: "This project allows users to stream music and create playlists.",
      },
      { type: "subheading", text: "Features" },
      {
        type: "list",
        items: [
          "User playlists",
          "Song recommendations",
          "Search functionality",
        ],
      },
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
      {
        type: "paragraph",
        text: "This project helps users track their workouts and progress.",
      },
      { type: "subheading", text: "Features" },
      {
        type: "list",
        items: ["Activity logging", "Progress charts", "Goal setting"],
      },
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
      {
        type: "paragraph",
        text: "This project allows users to create and share their favorite recipes.",
      },
      { type: "subheading", text: "Features" },
      {
        type: "list",
        items: ["Recipe categorization", "User profiles", "Rating system"],
      },
      { type: "image", text: "/m1619.png", alt: "Music Streaming Service" },
    ],
    pdf: "/react.pdf",
    images: ["/1619.png", "/placehol.png"],
    students: ["Emma Watson", "Daniel Radcliffe"],
    school: "Culinary School",
  },
];

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projectsData.find((proj) => proj.id === parseInt(id));
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return (
      <>
        <Navbar />
        <p>Project not found</p>
      </>
    );
  }

  return (
    <div className="bg-raisin-black-2 text-white">
      <Navbar />
      <div className="min-h-screen mt-16 p-4 md:p-8">
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
                  <span className="text-raisin-black-700">
                    {project.school}
                  </span>
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
                    <ul key={blockIndex} className="list-disc pl-5">
                      {Array.isArray(block.items) &&
                        block.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="mt-1">
                            {item}
                          </li>
                        ))}
                    </ul>
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
               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
             }}
           >
               <Viewer fileUrl={project.pdf} />
           </div>
         </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default ProjectPage;
