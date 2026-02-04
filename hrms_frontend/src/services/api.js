import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://hrms-9-crzc.onrender.com/api/",
});

export default api;
