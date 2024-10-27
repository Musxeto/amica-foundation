import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const interviewsData = [
  {
    id: 1,
    interviewName: "Interview with Playboi Carti",
    interviewer: "John Doe",
    description: "A deep dive into the creative process of Playboi Carti.",
    videoLink: "https://youtu.be/oK-9Lqm-8-s?list=OLAK5uy_n5ZwE3MkjjrtedzA92tQcAS44EtzgwIqI", 
    image: "/placehol.png",
  },
  {
    id: 2,
    interviewName: "Taylor Swift: The Art of Songwriting",
    interviewer: "Jane Smith",
    description: "Taylor Swift shares her journey as a songwriter.",
    videoLink: "https://www.youtube.com/watch?v=FSzCnVBZQS0",
    image: "/placehol.png",
  },
  {
    id: 3,
    interviewName: "Behind the Scenes with Chris Evans",
    interviewer: "Alice Johnson",
    description: "Chris Evans discusses his experiences in Hollywood.",
    videoLink: "https://youtu.be/FlvQrMidE3w",
    image: "/placehol.png",
  },
  {
    id: 4,
    interviewName: "Emma Watson on Activism",
    interviewer: "Bob Brown",
    description:
      "Emma Watson talks about her role in promoting gender equality.",
    videoLink: "https://www.youtube.com/watch?v=NEFEwfPcXRA",
    image: "/placehol.png",
  },
];
const Interviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredInterviews = interviewsData.filter(
    (interview) =>
      interview.interviewName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

        {/* Interviews List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredInterviews.map((interview) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
