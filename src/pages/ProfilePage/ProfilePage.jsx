import { useSelector } from "react-redux";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return (
      <main className="page">
        <section className="container">
          <StatusMessage
            title="Cargando perfil..."
            description="Obteniendo los datos de tu cuenta."
          />
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <section className="container">
          <StatusMessage
            title="No se pudo cargar el perfil"
            description={error}
            variant="error"
          />
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page">
        <section className="container">
          <StatusMessage
            title="Perfil no disponible"
            description="No se ha encontrado la información de tu cuenta."
            variant="warning"
          />
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <div className={styles.pageHeader}>
        <ButtonBack />
      </div>

      <section className="container">
        <div className={styles.profile}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>
              Mi cuenta
            </p>

            <h1 className={styles.title}>
              {user.name}
            </h1>

            <p className={styles.description}>
              Información de tu cuenta
            </p>
          </div>

          <div className={styles.info}>
            <div className={styles.field}>
              <span className={styles.label}>
                Nombre
              </span>

              <p className={styles.value}>
                {user.name}
              </p>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>
                Email
              </span>

              <p className={styles.value}>
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;