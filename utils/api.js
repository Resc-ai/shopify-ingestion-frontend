import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
});

// Attach API key from localStorage for tenant auth
api.interceptors.request.use(config => {
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }
  return config;
});

export default api;
