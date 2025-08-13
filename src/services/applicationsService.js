const API_BASE_URL = "http://localhost:8000";

export const applicationsService = {
  async submitApplication(applicationData) {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit application");
    }

    return await response.json();
  },

  async getApplications(userId) {
    const response = await fetch(
      `${API_BASE_URL}/applications?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    return await response.json();
  },

  async getApplicationById(id) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch application");
    }

    return await response.json();
  },

  async updateApplicationStatus(id, status) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update application status");
    }

    return await response.json();
  },
};
