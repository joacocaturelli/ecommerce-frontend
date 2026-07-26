import apiClient from "./axios";

export async function getReviewsByProductId(productId) {
  const response = await apiClient.get(`/products/${productId}/reviews`);
  return response.data.data;
}
