import axios from "axios";
import { store } from "../store/store";
import { clearAuth } from "../store/features/authSlice.js";

const apiClient = axios.create({
  baseURL: "/api",
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
