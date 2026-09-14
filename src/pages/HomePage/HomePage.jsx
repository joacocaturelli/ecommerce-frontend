import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <main className="page">
      <section className={styles.hero}>

        <div className={styles.content}>

          <p className={styles.eyebrow}>
            Editorial selection
          </p>

          <h1 className={styles.title}>
            Prendas, calzado y accesorios con una línea más sobria y atemporal.
          </h1>

          <p className={styles.description}>
            Descubre una selección pensada para vestir el día a día
            con equilibrio, comodidad y una estética más cuidada.
          </p>

          <Link
            to="/products"
            className={styles.cta}
          >
            Ver colección
            <span
              className={styles.arrow}
              aria-hidden="true"
            >
              →
            </span>
          </Link>

        </div>


        <div
          className={styles.visual}
          aria-hidden="true"
        >
          <div className={styles.visualCard}>
            <span className={styles.visualNumber}>
              01
            </span>

            <div className={styles.visualText}>
              <span>React Shop</span>
              <strong>Lab</strong>
            </div>

            <span className={styles.visualLabel}>
              Collection
            </span>
          </div>

          <div className={styles.circle} />
        </div>

      </section>


      <section className={styles.bottomSection}>
        <div className={styles.bottomItem}>
          <span>01</span>
          <p>Selección cuidada</p>
        </div>

        <div className={styles.bottomItem}>
          <span>02</span>
          <p>Diseño atemporal</p>
        </div>

        <div className={styles.bottomItem}>
          <span>03</span>
          <p>Compra sencilla</p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
