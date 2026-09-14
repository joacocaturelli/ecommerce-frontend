import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistThunk } from "../../store/features/wishlistSlice";
import ProductList from "../../components/ProductList/ProductList";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import styles from "./WishlistPage.module.css";

function WishlistPage() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, [dispatch]);

  const isEmpty = items.length === 0;

  return (
    <main className="page">
      <section className="container">
        <div className={styles.productsContainer}>
          <ButtonBack />

          <header className={styles.header}>
            <p className={styles.eyebrow}>
              Tu selección
            </p>

            <h1 className={styles.title}>
              Wishlist
            </h1>
          </header>

          {loading && (
            <StatusMessage
              title="Cargando wishlist..."
              description="Esperando respuesta del backend..."
            />
          )}

          {error && (
            <StatusMessage
              title="Ha ocurrido un error"
              description={error}
              variant="error"
            />
          )}

          {!loading && !error && isEmpty && (
            <StatusMessage
              title="Tu wishlist está vacía"
              description="Añade productos a favoritos para encontrarlos aquí."
            />
          )}

          {!loading && !error && !isEmpty && (
            <ProductList products={items} />
          )}
        </div>
      </section>
    </main>
  );
}

export default WishlistPage;