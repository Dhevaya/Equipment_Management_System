/**
 * Axios Instance Configuration
 * Centralized API client used across the application.
 * Includes request and response interceptors for error handling.
 */
import axios from "axios";

// Create a reusable Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Request timeout as specified in project requirements
});

// Request interceptor
// Runs before every API request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    // Authentication tokens could be attached here in real-world APIs
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
// Handles API responses and centralized error logging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.message
    );

    return Promise.reject(error);
  }
);

export default axiosInstance;