// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in development
  if (import.meta.env.DEV) {
    return "http://localhost:8000";
  }
  
  // Check for custom API URL from environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback to a free JSON hosting service
  return "https://my-json-server.typicode.com/Angekarara/job-board-db";
};

export const API_BASE_URL = getApiBaseUrl();
