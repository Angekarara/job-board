const API_BASE_URL = "/api";

export const jobsService = {
  async getJobs(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return await response.json();
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
