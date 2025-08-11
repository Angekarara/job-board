import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters, fetchJobs } from "../../store/slices/jobsSlice";
import Input from "../common/Input";
import Button from "../common/Button";

const JobFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.jobs);

  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters(localFilters));
    dispatch(fetchJobs({ ...localFilters, page: 1 }));
  };

  const handleClear = () => {
    const emptyFilters = { search: "", location: "", type: "" };
    setLocalFilters(emptyFilters);
    dispatch(setFilters(emptyFilters));
    dispatch(fetchJobs({ page: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Jobs</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Search"
            name="search"
            value={localFilters.search}
            onChange={handleInputChange}
            placeholder="Job title or company"
          />

          <Input
            label="Location"
            name="location"
            value={localFilters.location}
            onChange={handleInputChange}
            placeholder="City or state"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-tertiary mb-1">
              Job Type
            </label>
            <select
              name="type"
              value={localFilters.type}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button type="submit">Apply Filters</Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobFilters;
