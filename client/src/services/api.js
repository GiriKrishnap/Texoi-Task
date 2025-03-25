import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
  withCredentials: true,
});

// Add Authorization header for all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
