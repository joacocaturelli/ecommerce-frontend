import apiClient from "./axios";

export async function getProducts(includeInactive = false) {
  const response = await apiClient.get("/products", {
    params: {
      includeInactive, // Lo mandamos como parametro de la URL en la peticion
    },
  });
  return response.data.data;
}

export async function getProductById(productId) {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data.data;
}

export async function createProduct(formData) {
  const response = await apiClient.post("/products", formData);
  return response.data.data;
}

export async function updateProduct(productId, formData) {
  const response = await apiClient.put(`/products/${productId}`, formData);
  return response.data.data;
}

export async function deleteProduct(productId) {
  const response = await apiClient.put(`/products/deactivate/${productId}`);
  return response.data.data;
}

export async function restoreProduct(productId) {
  const response = await apiClient.put(`/products/activate/${productId}`);
  return response.data.data;
}
