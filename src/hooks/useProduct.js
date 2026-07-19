import { useState, useEffect } from "react";
import { getProductById } from "../api/products.js";

export function useProduct(productId) {
  const [product, setProduct] = useState(null); // Estado para el array de productos
  const [loading, setLoading] = useState(false); // Estado para Loading
  const [error, setError] = useState(null); // Estado para el manejo de errores

  useEffect(() => {
    async function showProduct() {
      try {
        setLoading(true);
        const data = await getProductById(productId); // Traemos el producto
        setProduct(data); // Lo guardamos en products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Indicamos en el estado de loading que no esta cargando
      }
    }
    showProduct();
  }, [productId]); // Solo se ejecuta useEffect al montar ProductsPage (solo una vez)

  return { product, loading, error };
}
