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
    const status = error?.response?.status;
    const method = (error?.config?.method || "").toLowerCase();
    const url = error?.config?.url || "";

    // JSONPlaceholder does not persist created records; PUT/DELETE on those IDs can return 500.
    // Avoid noisy stack traces in console for this expected mock API behavior.
    const isExpectedMockApi500 =
      status === 500 &&
      (method === "put" || method === "delete") &&
      /^\/((posts)|(comments))\/\d+$/.test(url);

    if (!isExpectedMockApi500) {
      console.error("API Error:", error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;