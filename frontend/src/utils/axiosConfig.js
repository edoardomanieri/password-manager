import Axios from "axios";
import "./auth"; // Import the auth interceptors

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `JWT ${token}`; // Note the 'JWT' prefix
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
