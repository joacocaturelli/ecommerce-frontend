import {
  useState,
  useRef,
  useEffect,
  useMemo
} from "react";
import { useProducts } from "../../hooks/useProducts.js";
import ProductGrid from "../../components/ProductGrid/ProductGrid.jsx";
import StatusMessage from "../../components/StatusMessage/StatusMessage.jsx";
import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const inputRef = useRef(null);

  const {
    products,
    loading,
    error
  } = useProducts();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "priceMin") {
          return a.price - b.price;
        }

        if (sortBy === "priceMax") {
          return b.price - a.price;
        }

        return a.name.localeCompare(b.name);
      });
  }, [products, search, sortBy]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <main className="page">
      <section className={styles.hero}>

        <div className={styles.header}>
          <h1>Productos</h1>
        </div>

        <div className={styles.filters}>

          <label
            htmlFor="search"
            className={styles.srOnly}
          >
            Buscar productos
          </label>

          <input
            ref={inputRef}
            className={styles.input}
            type="search"
            id="search"
            placeholder="Buscar productos..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />


          <label
            htmlFor="sort"
            className={styles.srOnly}
          >
            Ordenar productos
          </label>

          <select
            id="sort"
            className={styles.select}
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="name">
              Nombre
            </option>

            <option value="priceMax">
              Precio: mayor a menor
            </option>

            <option value="priceMin">
              Precio: menor a mayor
            </option>
          </select>

        </div>
      </section>


      {loading && (
        <StatusMessage
          title="Cargando productos..."
          description="Esperando respuesta del backend..."
        />
      )}


      {error && (
        <StatusMessage
          title="Ha ocurrido un error"
          description={error.message}
          variant="error"
        />
      )}


      {!loading && !error && (
        <ProductGrid
          products={visibleProducts}
        />
      )}
    </main>
  );
}

export default ProductsPage;
