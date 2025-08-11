import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../store/slices/jobsSlice";
import JobFilters from "../components/jobs/JobFilters";
import JobList from "../components/jobs/JobList";
import Button from "../components/common/Button";

const JobsPage = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, total, filters } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchJobs({ ...filters, page: 1 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchJobs({ ...filters, page: newPage }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Next Job
        </h1>
        <p className="text-gray-600">
          Discover {total} available positions from top companies
        </p>
      </div>

      <JobFilters />
      <JobList />


      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "primary" : "secondary"}
                  onClick={() => handlePageChange(page)}
                  size="sm"
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
