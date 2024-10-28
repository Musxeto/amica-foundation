import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

const Reports = () => {
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsCollection = collection(db, "reports");
        const reportsSnapshot = await getDocs(reportsCollection);
        const reportsList = reportsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReportsData(reportsList);
      } catch (error) {
        console.error("Error fetching reports: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-raisin-black-2 mt-16 text-white min-h-screen p-10">
        <h1 className="text-4xl font-bold text-buff-500 text-center mb-8">
          Reports
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <FaSpinner className="text-buff-500 text-4xl animate-spin" />
          </div>
        ) : (
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
                <p className="text-sm text-gray-500">
                  Uploaded by: {report.uploadedBy}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Reports;
