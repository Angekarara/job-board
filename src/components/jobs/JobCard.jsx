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
    <div className="bg-accent rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            {job.title}
          </h3>
          <p className="text-primary mb-1">{job.company}</p>
          <p className="text-sm text-tertiary">{job.location}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e17654] text-secondary">
          {job.type}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-primary text-sm line-clamp-3">{job.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-[#115e59]">{job.salary}</p>
          <p className="text-xs text-tertiary">
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
