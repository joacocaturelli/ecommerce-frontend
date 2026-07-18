import apiClient from "./axios";

export async function getProducts() {
  const response = await apiClient.get("/api/products");
  return response.data.data;
}

export async function getProductById(productId) {
  const response = await apiClient.get(`/api/products/${productId}`);
  return response.data.data;
}
