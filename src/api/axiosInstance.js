import axios from "axios";

// Create a reusable Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
// Runs before every API request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    // You could attach authentication tokens here in real applications
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
// Runs after every API response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;