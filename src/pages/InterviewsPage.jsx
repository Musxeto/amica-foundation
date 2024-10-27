import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample data array
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

const InterviewsPage = () => {
  const { id } = useParams();
  const interview = interviewsData.find(
    (interview) => interview.id === parseInt(id)
  );
  if (!interview) {
    return <div className="text-white text-center">Interview not found.</div>;
  }

  return (
    <>
      <Navbar />

      <div className="bg-raisin-black-2 mt-16 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">{interview.interviewName}</h1>
        <h2 className="text-2xl mb-2">Interviewer: {interview.interviewer}</h2>
        <p className="mb-4">{interview.description}</p>

        {/* Video Player */}
        <iframe
          width="100%"
          height="480"
          src={interview.videoLink}
          title={interview.interviewName}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <Footer/>
    </>
  );
};

export default InterviewsPage;
