import apiClient from "./axios";

export async function getProducts() {
  const response = await apiClient.get("/products");
  return response.data.data;
}

export async function getProductById(productId) {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data.data;
}
