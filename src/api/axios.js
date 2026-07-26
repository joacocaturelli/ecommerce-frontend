import axios from "axios";
import { store } from "../store/store";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

// El interceptor añade el token automaticamente a las cabeceras
// en cada llamada a la API para no tener que hacerlo manualmente
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  // store.getState() lee el estado actual de Redux al momento de la peticion

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
