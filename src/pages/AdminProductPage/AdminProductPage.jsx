import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import styles from "./AdminProductPage.module.css";

function AdminProductPage() {
  const {
    products,
    loading,
    error,
    deactivateProduct,
    activateProduct,
  } = useProducts(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
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

  return (
    <main className="page">
      <section className={styles.hero}>
        <ButtonBack />

        <div className={styles.header}>
          <h1>Productos</h1>

          <Link
            to="/admin/products/form"
            className={styles.createButton}
          >
            + Crear producto
          </Link>
        </div>

        <div className={styles.filters}>
          <label htmlFor="search" className={styles.srOnly}>
            Buscar productos
          </label>

          <input
            className={styles.input}
            type="search"
            id="search"
            placeholder="Buscar productos..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <label htmlFor="sort" className={styles.srOnly}>
            Ordenar productos
          </label>

          <select
            id="sort"
            className={styles.select}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name">Nombre</option>
            <option value="priceMax">Precio: mayor a menor</option>
            <option value="priceMin">Precio: menor a mayor</option>
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
          admin
          deactivateProduct={deactivateProduct}
          activateProduct={activateProduct}
        />
      )}
    </main>
  );
}

export default AdminProductPage;