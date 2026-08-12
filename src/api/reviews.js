import apiClient from "./axios";

export async function getReviewsByProductId(productId) {
  const response = await apiClient.get(`/products/${productId}/reviews`);
  return response.data.data;
}

export async function getReviewsByUser() {
  const response = await apiClient.get(`/reviews`);
  return response.data.data;
}

export async function createReview(productId, rating, comment) {
  const response = await apiClient.post(`/products/${productId}/reviews`, {
    rating,
    comment,
  });
  return response.data.data;
}

export async function updateReview(productId, rating, comment) {
  const response = await apiClient.put(`/reviews/${productId}`, {
    rating,
    comment,
  });
  return response.data.data;
}

export async function deleteReview(productId) {
  const response = await apiClient.delete(`/reviews/${productId}`);
  return response.data.data;
}
