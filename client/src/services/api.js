import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
});

// Add Authorization header for all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default API;
