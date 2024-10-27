import React from "react";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const reportsData = [
  {
    id: 1,
    title: "AI in Healthcare",
    description:
      "Exploring the applications of AI in modern healthcare systems.",
    uploadedBy: "Alice Johnson",
    pdf: "/ds.pdf", // Ensure this file exists
  },
  {
    id: 2,
    title: "Blockchain Basics",
    description:
      "An introduction to the fundamentals of blockchain technology.",
    uploadedBy: "Bob Brown",
    pdf: "/react.pdf", // Ensure this file exists
  },
  {
    id: 3,
    title: "React Performance Optimization",
    description: "Tips and tricks to make React apps run faster.",
    uploadedBy: "Carol White",
    pdf: "/science.pdf", // Ensure this file exists
  },
  {
    id: 4,
    title: "Machine Learning Algorithms",
    description: "A comprehensive guide to popular ML algorithms.",
    uploadedBy: "Dave Smith",
    pdf: "/react.pdf", // Ensure this file exists
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

        <div className="mt-8">
          <object
            data={report.pdf}
            type="application/pdf"
            width="100%"
            height="800px"
          >
            <p>
              Your browser does not support PDFs.{" "}
              <a href={report.pdf}>Download the PDF</a>.
            </p>
          </object>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportsPage;
