import apiClient from "./axios";

export async function getWishlist() {
  const response = await apiClient.get("/wishlist");
  return response.data.data;
}

export async function addToWishlist(productId) {
  const response = await apiClient.post(`/wishlist/items`, { productId });
  return response.data.data;
}

export async function removeFromWishlist(productId) {
  const response = await apiClient.delete(`/wishlist/items`, {
    data: { productId },
  });
  return response.data.data;
}
