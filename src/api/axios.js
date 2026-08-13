import axios from "axios";
import { store } from "../store/store";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default apiClient;
