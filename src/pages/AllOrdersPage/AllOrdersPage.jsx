import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../../store/features/orderSlice.js";
import OrderList from "../../components/OrderList/OrderList";
import StatusMessage from "../../components/StatusMessage/StatusMessage.jsx";
import ButtonBack from "../../components/ButtonBack/ButtonBack.jsx";
import styles from "./AllOrdersPage.module.css";

function AllOrdersPage() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  const isEmpty = orders.length === 0;

  return (
    <main className="page">
      <section className="container">
        <div className={styles.ordersContainer}>
          <ButtonBack />

          <header className={styles.header}>
            <p className={styles.eyebrow}>
              Mi cuenta
            </p>

            <h1 className={styles.title}>
              Mis pedidos
            </h1>
          </header>

          {loading && (
            <StatusMessage
              title="Cargando pedidos..."
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
              title="Todavía no tienes pedidos"
              description="Cuando realices una compra, tus pedidos aparecerán aquí."
            />
          )}

          {!loading && !error && !isEmpty && (
            <OrderList orders={orders} />
          )}
        </div>
      </section>
    </main>
  );
}

export default AllOrdersPage;