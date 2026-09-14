import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginThunk } from "../../store/features/authSlice";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import Button from "../../components/Button/Button";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailInputRef = useRef(null);

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await dispatch(
      loginThunk(credentials)
    );

    if (loginThunk.fulfilled.match(result)) {
      navigate("/");
    }
  }

  return (
    <main className="page">
      <section className="container">
        <div className={styles.loginContainer}>

          <div className={styles.header}>
            <p className={styles.eyebrow}>
              React Shop Lab
            </p>

            <h1 className={styles.title}>
              Inicia sesión
            </h1>

            <p className={styles.description}>
              Accede a tu cuenta para continuar con tus compras.
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
            className={styles.loginForm}
          >
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
                autoComplete="current-password"
                required
              />
            </label>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </Button>
          </form>

          <p className={styles.registerText}>
            ¿Todavía no tienes una cuenta?
          </p>

          <Link
            to="/register"
            className={styles.link}
          >
            Crear una cuenta
          </Link>

        </div>
      </section>
    </main>
  );
}

export default LoginPage;
