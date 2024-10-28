import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactPlayer from "react-player";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

const InterviewsPage = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const interviewCollection = collection(db, "interviews");
        const interviewSnapshot = await getDocs(interviewCollection);
        const interviewList = interviewSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const foundInterview = interviewList.find(
          (interview) => interview.id === id
        );
        
        if (foundInterview) {
          setInterview(foundInterview);
        } else {
          setError("Interview not found.");
        }
      } catch (err) {
        setError("Failed to fetch interview data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="bg-raisin-black-2 min-h-screen mt-16 text-white p-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="text-buff-500 text-5xl animate-spin" />
          </div>
        ) : error ? (
          <div className="text-white text-center">{error}</div>
        ) : (
          interview && (
            <>
              <h1 className="text-4xl font-bold mb-4">{interview.interviewName}</h1>
              <h2 className="text-2xl mb-2">Interviewer: {interview.interviewer}</h2>
              <p className="mb-4">{interview.description}</p>

              {/* Video Player */}
              <div className="player-wrapper" style={{ position: "relative", paddingTop: "56.25%" }}>
                <ReactPlayer
                  url={interview.videoLink}
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  controls={true}
                />
              </div>
            </>
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default InterviewsPage;
