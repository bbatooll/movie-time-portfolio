// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "891d0e4c4700565fa5459e948f47c4ca",
  },
});

export default axiosInstance;
