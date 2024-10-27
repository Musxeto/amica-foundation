import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const Reports = () => {
  return (
    <>
      <Navbar />
      <div className="bg-raisin-black-2 mt-16 text-white min-h-screen p-10">
        <h1 className="text-4xl font-bold text-buff-500 text-center mb-8">
          Reports
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportsData.map((report) => (
            <Link
              key={report.id}
              to={`/reports/${report.id}`}
              className="bg-raisin-black-400 text-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold mb-2 hover:text-buff-400 transition-colors duration-300">
                {report.title}
              </h2>
              <p className="text-gray-300 mb-4">{report.description}</p>
              <p className="text-sm text-gray-500">Uploaded by: {report.uploadedBy}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reports;
