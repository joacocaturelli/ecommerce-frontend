import apiClient from "./axios";

export async function getOrders() {
  const response = await apiClient.get("/orders");
  return response.data.data;
}

export async function getOrderById(orderId) {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data.data;
}
