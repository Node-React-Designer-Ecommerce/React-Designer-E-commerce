import axios from "axios";
import Cookies from "js-cookie";
const LIVE = "https://node-designer-e-commerce-production.up.railway.app/api/v1";
const LOCAL = "http://localhost:4001/api/v1/";

const axiosInstance = axios.create({
  baseURL: LIVE,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    let token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Cookies.remove("token");
      // Cookies.remove("isLoggedIn");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
