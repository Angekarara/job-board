// src/components/jobs/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const JobCard = ({ job }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <p className="text-gray-600 mb-1">{job.company}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {job.type}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 text-sm line-clamp-3">{job.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-green-600">{job.salary}</p>
          <p className="text-xs text-gray-500">
            Posted: {formatDate(job.postedDate)}
          </p>
        </div>
        <Link to={`/jobs/${job.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
