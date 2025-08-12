const API_BASE_URL = "/api";

export const authService = {
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return await response.json();
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  },

  async logout() {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  async verifyToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    return Promise.resolve({ valid: true });
  },
};
