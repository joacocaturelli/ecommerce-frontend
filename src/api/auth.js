import apiClient from "./axios";

export async function registerUser(credentials) {
  const response = await apiClient.post("/auth/register", credentials);
  return response.data.data;
}

export async function loginUser(credentials) {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data.data;
}

export async function getMe() {
  const response = await apiClient.get("/users/profile");
  return response.data.data;
}
