import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../store/features/authSlice";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import Button from "../../components/Button/Button";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailInputRef = useRef(null);

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await dispatch(
      registerThunk(credentials)
    );

    if (registerThunk.fulfilled.match(result)) {
      navigate("/login");
    }
  }

  return (
    <main className="page">
      <section className="container">
        <div className={styles.registerContainer}>

          <div className={styles.header}>
            <p className={styles.eyebrow}>
              React Shop Lab
            </p>

            <h1 className={styles.title}>
              Crear una cuenta
            </h1>

            <p className={styles.description}>
              Regístrate para guardar tus compras y gestionar
              tu cuenta.
            </p>
          </div>

          {error && (
            <StatusMessage
              title="Error"
              description={error}
              variant="error"
            />
          )}

          <form
            onSubmit={handleSubmit}
            className={styles.registerForm}
          >
            <label className={styles.field}>
              <span className={styles.label}>
                Nombre de usuario
              </span>

              <input
                className={styles.input}
                type="text"
                name="name"
                value={credentials.name}
                placeholder="Nombre"
                onChange={handleChange}
                disabled={loading}
                autoComplete="name"
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>
                Email
              </span>

              <input
                className={styles.input}
                ref={emailInputRef}
                type="email"
                name="email"
                value={credentials.email}
                placeholder="tu@email.com"
                onChange={handleChange}
                disabled={loading}
                autoComplete="email"
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>
                Contraseña
              </span>

              <input
                className={styles.input}
                type="password"
                name="password"
                value={credentials.password}
                placeholder="••••••••"
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
                required
              />
            </label>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Registrando..."
                : "Registrarse"}
            </Button>
          </form>

          <p className={styles.loginText}>
            ¿Ya tienes una cuenta?
          </p>

          <button
            type="button"
            className={styles.link}
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>

        </div>
      </section>
    </main>
  );
}

export default RegisterPage;