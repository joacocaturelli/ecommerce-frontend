import axios from "axios";

// Esta es la manera en que se leen las variables .env con react/vite
const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default apiClient;
