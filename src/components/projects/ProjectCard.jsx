import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <Link to={`/projects/${project.id}`} className="no-underline">
      <div className="bg-raisin-black-400 rounded-lg h-full shadow-md p-5 hover:shadow-lg hover:scale-105 hover:shadow-light-red-500 transition-all duration-300 ease-in-out">
        {project.images[0] && (
          <img
            src={project.images[0]}
            alt={project.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        )}
        {project.name && (
          <h2 className="text-xl font-semibold text-buff-500 mb-2">
            {project.name}
          </h2>
        )}
        {project.shortDescription && (
          <p className="text-gray-400 mb-2">
            {truncate(project.shortDescription, 70)}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.students &&
            project.students.map((student, index) => (
              <span
                key={index}
                className="bg-yellow-green-500 text-raisin-black-100 text-sm px-2 py-1 rounded-full"
              >
                {student}
              </span>
            ))}
        </div>
        <p className="text-raisin-black-700 mt-2">{project.school}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
