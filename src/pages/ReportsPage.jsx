import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

const ReportsPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const reportCollection = collection(db, "reports");
      const reportSnapshot = await getDocs(reportCollection);
      const reportList = reportSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const foundReport = reportList.find((report) => report.id === id);
      setReport(foundReport || null);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <>
      <Navbar />
      <div className="bg-raisin-black-2 mt-16 text-white min-h-screen p-10">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="text-buff-500 text-5xl animate-spin" />
          </div>
        ) : report ? (
          <>
            <h1 className="text-4xl font-bold text-buff-500 text-center mb-4">
              {report.title}
            </h1>
            <p className="text-gray-300 mb-2">{report.description}</p>
            <p className="text-sm text-gray-500">
              Uploaded by: {report.uploadedBy}
            </p>

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
                {report.pdf ? (
                 
                    <Viewer fileUrl={report.pdf} />
                ) : (
                  <p>PDF could not be loaded.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center">Report not found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReportsPage;
