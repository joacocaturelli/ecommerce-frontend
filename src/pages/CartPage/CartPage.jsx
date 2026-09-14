import { useDispatch, useSelector } from "react-redux";
import { checkoutThunk } from "../../store/features/cartSlice";
import ProductList from "../../components/ProductList/ProductList";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import Button from "../../components/Button/Button";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import styles from "./CartPage.module.css";

function CartPage() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.cart
  );

  const totalInCents = items.reduce((acc, item) => {
    const priceInCents = Math.round(
      Number(item.product.price) * 100
    );

    return acc + priceInCents * item.quantity;
  }, 0);

  const total = (totalInCents / 100).toFixed(2);
  const isEmpty = items.length === 0;

  async function handleCheckOut() {
    const order = await dispatch(
      checkoutThunk()
    ).unwrap();

    window.location.href = order.url;
  }

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
              Carrito
            </h1>
          </header>

          {loading && (
            <StatusMessage
              title="Cargando productos..."
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
              title="Tu carrito está vacío"
              description="Añade algún producto para comenzar tu compra."
            />
          )}

          {!loading && !error && !isEmpty && (
            <>
              <ProductList
                products={items}
                cart={true}
              />

              <div className={styles.summary}>
                <div className={styles.total}>
                  <span>Total</span>
                  <strong>{total}€</strong>
                </div>

                <Button
                  onClick={handleCheckOut}
                  className={styles.buyButton}
                >
                  Comprar
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default CartPage;