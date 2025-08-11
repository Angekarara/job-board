import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobById, clearCurrentJob } from "../../store/slices/jobsSlice";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import Button from "../common/Button";
import ApplicationForm from "./ApplicationForm";
import Modal from "../common/Modal";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentJob, isLoading, error } = useSelector((state) => state.jobs);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }

    return () => {
      dispatch(clearCurrentJob());
    };
  }, [dispatch, id]);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setShowApplicationForm(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Failed to load job details: ${error}`}
        className="my-4"
      />
    );
  }

  if (!currentJob) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Job not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-secondary rounded-lg shadow-xl p-8">
        <div className="border-b border-tertiary pb-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                {currentJob.title}
              </h1>
              <h2 className="text-xl text-primary mb-2">
                {currentJob.company}
              </h2>
              <p className="text-tertiary">{currentJob.location}</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e17654] text-secondary">
              {currentJob.type}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-semibold text-[#115e59] mb-2">
                {currentJob.salary}
              </p>
              <p className="text-sm text-tertiary">
                Posted: {formatDate(currentJob.postedDate)}
              </p>
              <p className="text-sm text-tertiary">
                Deadline: {formatDate(currentJob.applicationDeadline)}
              </p>
            </div>
            <Button onClick={handleApplyClick} size="lg">
              Apply Now
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Job Description
          </h3>
          <p className="text-primary leading-relaxed">
            {currentJob.description}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Requirements
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {currentJob.requirements.map((requirement, index) => (
              <li key={index} className="text-tertiary">
                {requirement}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Button variant="secondary" onClick={() => navigate("/jobs")}>
            ← Back to Jobs
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        title="Apply for Position"
        size="lg"
      >
        <ApplicationForm
          job={currentJob}
          onClose={() => setShowApplicationForm(false)}
        />
      </Modal>
    </div>
  );
};

export default JobDetails;
