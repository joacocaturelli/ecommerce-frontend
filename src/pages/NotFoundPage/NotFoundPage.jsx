import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="page">
      <section className={styles.notFound}>
        <p className={styles.code}>404</p>

        <h1 className={styles.title}>
          Página no encontrada
        </h1>

        <p className={styles.description}>
          La página que buscas no existe o ya no está disponible.
        </p>

        <Button onClick={() => navigate("/")}>
          Volver a la Home
        </Button>
      </section>
    </main>
  );
}

export default NotFoundPage;