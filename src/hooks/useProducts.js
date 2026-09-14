import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApiError } from "../utils/apiError";
import { showError } from "../store/features/toastSlice";
import * as apiProduct from "../api/products";

export function useProducts(includeInactive = false) {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]); // Estado para el array de productos
  const [loading, setLoading] = useState(false); // Estado para Loading
  const [error, setError] = useState(null); // Estado para el manejo de errores

  async function fetchProducts() {
    const data = await apiProduct.getProducts(includeInactive); // Traemos los productos
    setProducts(data); // Los guardamos en products
  }

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);

      await fetchProducts();
    } catch (error) {
      const apiError = getApiError(error);

      setError(apiError);
      dispatch(showError(apiError.message));
    } finally {
      setLoading(false); // Indicamos en el estado de loading que no esta cargando
    }
  }

  async function createProduct(formData) {
    try {
      setLoading(true);
      setError(null);

      await apiProduct.createProduct(formData);
      await fetchProducts();
    } catch (error) {
      const apiError = getApiError(error);

      setError(apiError);
      dispatch(showError(apiError.message));

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function updateProduct(productId, formData) {
    try {
      setLoading(true);
      setError(null);

      await apiProduct.updateProduct(productId, formData);
      await fetchProducts();
    } catch (error) {
      const apiError = getApiError(error);

      setError(apiError);
      dispatch(showError(apiError.message));

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function deactivateProduct(productId) {
    try {
      setLoading(true);
      setError(null);

      await apiProduct.deleteProduct(productId);
      await fetchProducts();
    } catch (error) {
      const apiError = getApiError(error);

      setError(apiError);
      dispatch(showError(apiError.message));

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function activateProduct(productId) {
    try {
      setLoading(true);
      setError(null);

      await apiProduct.restoreProduct(productId);
      await fetchProducts();
    } catch (error) {
      const apiError = getApiError(error);

      setError(apiError);
      dispatch(showError(apiError.message));

      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [includeInactive]);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deactivateProduct,
    activateProduct,
  };
}
