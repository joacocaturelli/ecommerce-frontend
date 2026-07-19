import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

export function useProducts() {
  const [products, setProducts] = useState([]); // Estado para el array de productos
  const [loading, setLoading] = useState(false); // Estado para Loading
  const [error, setError] = useState(null); // Estado para el manejo de errores

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts(); // Traemos los productos
        setProducts(data); // Los guardamos en products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Indicamos en el estado de loading que no esta cargando
      }
    }
    loadProducts();
  }, []); // Solo se ejecuta useEffect al montar ProductsPage (solo una vez)

  return { products, loading, error };
}
