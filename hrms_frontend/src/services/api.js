import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-8-vmn3.onrender.com/api/",
});

export default api;
