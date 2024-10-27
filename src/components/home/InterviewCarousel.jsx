import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link

const InterviewCarousel = ({ interviews }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full h-auto p-5 mt-4 bg-raisin-black-2 rounded-lg hover:shadow-light-red-500 hover:shadow-lg transition-all transition-2s">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={true}
        arrows={false}
      >
        {interviews.map((interview) => (
          <Link
            key={interview.id}
            to={`/interview/${interview.id}`} // Dynamic route for the interview
            className="flex flex-col md:flex-row items-center mb-3 pb-4"
          >
            {/* Details Column */}
            <div className="flex flex-col justify-center w-full md:w-1/2 pl-4 pb-4 text-left">
              <h2 className="text-2xl font-bold text-white">{interview.interviewName}</h2>
              <p className="text-white mb-4">Interviewer: {interview.interviewer}</p>
              <p className="text-white mb-4">{interview.description}</p>
              <span className="flex items-center mt-2 text-yellow-400 hover:text-yellow-300 transition-transform transform hover:-translate-y-1">
                <span>Watch Interview</span>
                <FaArrowRight className="ml-1" />
              </span>
            </div>
            {/* Image Column */}
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={interview.image}
                className="w-full h-48 md:h-72 object-cover rounded-lg"
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default InterviewCarousel;
