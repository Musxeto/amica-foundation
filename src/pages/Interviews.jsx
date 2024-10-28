import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../firebase"; // Ensure your firebase configuration is correct
import { collection, getDocs } from "firebase/firestore";

const Interviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [interviews, setInterviews] = useState([]); // State to store interviews
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const interviewCollection = collection(db, "interviews"); // Your Firestore collection name
        const interviewSnapshot = await getDocs(interviewCollection);
        const interviewList = interviewSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInterviews(interviewList);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchInterviews();
  }, []);

  // Filter interviews based on search query
  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.interviewName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-raisin-black-2 text-white">
      <Navbar />
      <div className="min-h-screen mt-16 p-8">
        <h1 className="text-4xl text-buff-500 font-bold text-center mb-4">
          Interviews
        </h1>
        <p className="text-raisin-black-800 text-xl text-center mb-6">
          Insightful conversations with notable personalities.
        </p>

        {/* Search Control */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search interviews..."
            className="bg-raisin-black-400 p-2 focus:border focus:border-light-red rounded-md text-white w-full md:w-1/2 mx-auto transition-transform duration-300 focus:scale-105 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="text-buff-500 text-5xl animate-spin" />
          </div>
        ) : (
          // Interviews List
          <div className="grid grid-cols-1 gap-6">
            {filteredInterviews.map((interview) => (
              <Link to={`/interview/${interview.id}`}>
                <div
                  key={interview.id}
                  className="p-4 bg-raisin-black-500 rounded-lg flex flex-col md:flex-row transition-transform transform hover:scale-105 duration-300"
                >
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
                    <h2 className="md:text-2xl text-xl font-bold mb-2 hover:text-buff-400 transition-colors duration-300">
                      {interview.interviewName}
                    </h2>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      Interviewer: {interview.interviewer}
                    </h3>
                    <p className="text-md mb-2">{interview.description}</p>
                    <Link
                      to={`/interview/${interview.id}`}
                      className="text-buff-500 inline-flex items-center mt-2 hover:text-buff-600 transition-all duration-200"
                    >
                      Watch Interview <FaArrowRight className="ml-1" />
                    </Link>
                  </div>
                  <div className="md:w-1/2">
                    <img
                      src={interview.image}
                      alt={interview.interviewName}
                      className="w-full h-auto md:h-72 rounded-md object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;
