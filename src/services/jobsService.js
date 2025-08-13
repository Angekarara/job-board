import { API_BASE_URL } from "./config.js";

export const jobsService = {
  async getJobs(params = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      let jobs = await response.json();
      const { search, location, type } = params;

      if (search) {
        const searchLower = search.toLowerCase();
        jobs = jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower)
        );
      }

      if (location) {
        const locationLower = location.toLowerCase();
        jobs = jobs.filter((job) =>
          job.location.toLowerCase().includes(locationLower)
        );
      }

      if (type) {
        jobs = jobs.filter((job) => job.type === type);
      }

      const page = params.page || 1;
      const limit = 10;
      const start = (page - 1) * limit;
      const paginatedJobs = jobs.slice(start, start + limit);

      return {
        jobs: paginatedJobs,
        total: jobs.length,
        totalPages: Math.ceil(jobs.length / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  },

  async getJobById(id) {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch job details");
    }

    return await response.json();
  },

  async searchJobs(searchTerm) {
    return this.getJobs({ search: searchTerm });
  },

  async filterJobs(filters) {
    return this.getJobs(filters);
  },
};
