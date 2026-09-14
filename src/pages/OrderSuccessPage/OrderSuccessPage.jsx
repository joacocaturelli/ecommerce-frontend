import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderByIdThunk
} from "../../store/features/orderSlice";
import { getCartThunk } from "../../store/features/cartSlice";
import OrderCard from "../../components/OrderCard/OrderCard";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import Button from "../../components/Button/Button";
import styles from "./OrderSuccessPage.module.css";

function OrderSuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const {
    currentOrder,
    loading,
    error
  } = useSelector((state) => state.order);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;
    let timeoutId;

    async function checkOrder() {
      const result = await dispatch(
        getOrderByIdThunk(orderId)
      );

      if (getOrderByIdThunk.fulfilled.match(result)) {
        const order = result.payload;

        if (
          order.status === "PAID" ||
          order.status === "CANCELLED"
        ) {
          dispatch(getCartThunk());
          return;
        }
      }

      attempts += 1;

      if (attempts < maxAttempts) {
        timeoutId = setTimeout(checkOrder, 1000);
      }
    }

    checkOrder();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, orderId]);

  function handleViewOrders() {
    navigate("/orders");
  }

  function handleContinueShopping() {
    navigate("/products");
  }

  if (loading && !currentOrder) {
    return (
      <main className="page">
        <section className="container">
          <StatusMessage
            title="Confirmando tu pedido..."
            description="Estamos comprobando el estado del pago."
          />
        </section>
      </main>
    );
  }

  if (error && !currentOrder) {
    return (
      <main className="page">
        <section className="container">
          <StatusMessage
            title="No se pudo comprobar el pedido"
            description={error}
            variant="error"
          />
        </section>
      </main>
    );
  }

  if (!currentOrder) {
    return (
      <main className="page">
        <section className="container">
          <StatusMessage
            title="Pedido no encontrado"
            description="No hemos podido encontrar la información de este pedido."
            variant="warning"
          />
        </section>
      </main>
    );
  }

  const isPaid = currentOrder.status === "PAID";
  const isPending = currentOrder.status === "PENDING";
  const isCancelled = currentOrder.status === "CANCELLED";

  return (
    <main className="page">
      <section className="container">
        <div className={styles.content}>

          <header
            className={`${styles.header} ${
              isPaid
                ? styles.success
                : isCancelled
                  ? styles.cancelled
                  : styles.pending
            }`}
          >
            <p className={styles.eyebrow}>
              Estado del pedido
            </p>

            {isPaid && (
              <>
                <h1 className={styles.title}>
                  ¡Pago realizado correctamente!
                </h1>

                <p className={styles.description}>
                  Tu pedido se ha confirmado correctamente.
                </p>
              </>
            )}

            {isPending && (
              <>
                <h1 className={styles.title}>
                  Confirmando el pago...
                </h1>

                <p className={styles.description}>
                  El pago se ha realizado, pero todavía estamos
                  esperando la confirmación del pedido.
                </p>
              </>
            )}

            {isCancelled && (
              <>
                <h1 className={styles.title}>
                  Pago cancelado
                </h1>

                <p className={styles.description}>
                  El pago no se ha completado y el pedido se ha
                  cancelado.
                </p>
              </>
            )}
          </header>

          {isPending && (
            <StatusMessage
              title="Estamos esperando la confirmación"
              description="Esta página comprobará automáticamente el estado del pedido durante unos segundos."
            />
          )}

          <OrderCard order={currentOrder} />

          <div className={styles.actions}>
            <Button onClick={handleViewOrders}>
              Ver mis pedidos
            </Button>

            <Button
              variant="adminDanger"
              onClick={handleContinueShopping}
            >
              Seguir comprando
            </Button>
          </div>

        </div>
      </section>
    </main>
  );
}

export default OrderSuccessPage;