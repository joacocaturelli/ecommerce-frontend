import axios from "axios";
import { store } from "../store/store";
import { clearAuth } from "../store/features/authSlice.js";

// Esta es la manera en que se leen las variables .env con react/vite
const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401 && error.config?.url !== "auth/login") {
      store.dispatch(clearAuth());
    }

    return Promise.reject(error);
  },
);

export default apiClient;
