import axios from "axios";
import { BASE_API_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// List of endpoints to exclude from adding the Authorization header
const excludeEndpoints = [
  "/auth/login",
  "/auth/register",
  "/auth/activate",
  "/status",
  "/health",
];

// Request Interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
      config.url?.includes(endpoint);
    });

    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error(
          "Server Error. Please try again later",
          error.response.data,
        );
      } else if (
        error.code === "ECONNABORTED" ||
        error.message === "Network Error"
      ) {
        console.error(
          "Request timed out or Network Error. Please check your connection.",
        );
      }
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;
