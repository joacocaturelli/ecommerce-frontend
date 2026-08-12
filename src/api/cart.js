import apiClient from "./axios";

export async function getCart() {
  const response = await apiClient.get("/cart");
  return response.data.data;
}

export async function addProductToCart(productId, quantity) {
  const response = await apiClient.post("/cart/items", {
    productId,
    quantity,
  });
  return response.data.data;
}

export async function removeProductToCart(productId) {
  const response = await apiClient.delete("/cart/items", {
    data: { productId },
  });
  return response.data.data;
}

export async function cartCheckout() {
  const response = await apiClient.post("/cart/checkout");
  return response.data.data;
}
