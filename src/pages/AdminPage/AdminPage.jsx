import { Link } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import styles from "./AdminPage.module.css";

function AdminPage() {
  return (
    <main className="page">
      <section className={styles.dashboard}>
        <ButtonBack />

        <header className={styles.header}>
          <p className={styles.eyebrow}>Administración</p>

          <h1>Admin Dashboard</h1>

          <p className={styles.description}>
            Gestiona los diferentes apartados de la tienda desde este panel.
          </p>
        </header>

        <section className={styles.cards}>
          <Link
            to="/admin/products"
            className={styles.card}
          >
            <div className={styles.cardIcon} aria-hidden="true">
              📦
            </div>

            <div className={styles.cardContent}>
              <h2>Productos</h2>

              <p>
                Crea, edita, activa y desactiva los productos de la tienda.
              </p>
            </div>

            <span
              className={styles.cardArrow}
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </section>
      </section>
    </main>
  );
}

export default AdminPage;