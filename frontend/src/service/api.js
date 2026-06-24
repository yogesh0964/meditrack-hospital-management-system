import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Har request ke saath token automatically attach karo
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("meditrack_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;