import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://smart-complain-management-system.onrender.com/api",
});

// Attach token automatically to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
