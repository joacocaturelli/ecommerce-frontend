import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiError } from "../utils/apiError.js";
import { showError } from "../store/features/toastSlice.js";
import { getProductById } from "../api/products.js";

export function useProduct(productId) {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null); // Estado para el array de productos
  const [loading, setLoading] = useState(Boolean(productId)); // Estado para Loading
  const [error, setError] = useState(null); // Estado para el manejo de errores

  useEffect(() => {
    if (!productId) return;

    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(productId); // Traemos el producto
        setProduct(data); // Lo guardamos en products
      } catch (err) {
        const apiError = getApiError(error);

        setError(apiError);
        dispatch(showError(apiError.message));
      } finally {
        setLoading(false); // Indicamos en el estado de loading que no esta cargando
      }
    }

    loadProduct();
  }, [productId, dispatch]);

  return { product, loading, error };
}
