import { API_BASE_URL } from "./config.js";

export const authService = {
  async login(credentials) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users?email=${credentials.email}`
      );
      const users = await response.json();

      if (users.length === 0) {
        throw new Error("Invalid credentials");
      }

      const user = users[0];
      if (user.password !== credentials.password) {
        throw new Error("Invalid credentials");
      }

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  },

  async register(userData) {
    try {
      const checkResponse = await fetch(
        `${API_BASE_URL}/users?email=${userData.email}`
      );
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        throw new Error("User already exists");
      }

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const newUser = await response.json();
      const token = btoa(
        JSON.stringify({ userId: newUser.id, email: newUser.email })
      );

      return {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      };
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
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
