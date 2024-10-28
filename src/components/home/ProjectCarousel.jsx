import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link

const ProjectCarousel = ({ projects }) => {
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
    <div className="w-full h-auto mt-4 p-5 bg-raisin-black-2 hover:shadow-light-red-500 hover:shadow-md rounded-lg transition-all transition-4s">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        arrows={false}
        showDots={true}
      >
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="flex flex-col md:flex-row items-center p-4 mb-5"
          >
            {/* Image Column */}
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={project.images[0]}
                className="w-full h-48 md:h-72 object-cover rounded-lg"
              />
            </div>
            {/* Details Column */}
            <div className="flex flex-col justify-center w-full md:w-1/2 pl-4 text-left">
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              <p className="text-white mb-4">
                {project.shortDescription.length > 70
                  ? `${project.shortDescription.slice(0, 80)}...`
                  : project.shortDescription}
              </p>
              <span className="flex items-center mt-2 text-yellow-400 hover:text-yellow-300 transition-transform transform hover:-translate-y-1">
                <span>Go to Project</span>
                <FaArrowRight className="ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default ProjectCarousel;
