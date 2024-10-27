import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const reportsData = [
  {
    id: 1,
    title: "AI in Healthcare",
    description: "Exploring the applications of AI in modern healthcare systems.",
    uploadedBy: "Alice Johnson",
    pdf: "/ds.pdf",
  },
  {
    id: 2,
    title: "Blockchain Basics",
    description: "An introduction to the fundamentals of blockchain technology.",
    uploadedBy: "Bob Brown",
    pdf: "/react.pdf",
  },
  {
    id: 3,
    title: "React Performance Optimization",
    description: "Tips and tricks to make React apps run faster.",
    uploadedBy: "Carol White",
    pdf: "/science.pdf",
  },
  {
    id: 4,
    title: "Machine Learning Algorithms",
    description: "A comprehensive guide to popular ML algorithms.",
    uploadedBy: "Dave Smith",
    pdf: "/react.pdf",
  },
];

const ReportsPage = () => {
  const { id } = useParams();
  const report = reportsData.find((report) => report.id === parseInt(id));

  if (!report) {
    return <div className="text-center text-red-600">Report not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-raisin-black-2 mt-16 text-white min-h-screen p-10">
        <h1 className="text-4xl font-bold text-buff-500 text-center mb-4">
          {report.title}
        </h1>
        <p className="text-gray-300 mb-2">{report.description}</p>
        <p className="text-sm text-gray-500">
          Uploaded by: {report.uploadedBy}
        </p>

        <div className="mt-8 flex justify-center">
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
              <Viewer fileUrl={report.pdf} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportsPage;
