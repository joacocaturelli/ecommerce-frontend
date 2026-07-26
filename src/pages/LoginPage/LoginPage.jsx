import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { Link } from "react-router-dom";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import Button from '../../components/Button/Button';
import styles from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const emailInputRef = useRef(null)

  const { loading, error } = useSelector((state) => state.auth)

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  function handleChange(event) {
    const {name, value} = event.target
    setCredentials((prev) => ({
      ...prev, // Copiamos los datos que ya habia
      [name]: value 
      // Actualiza solo el campo que cambio (email o password)
      // name = 'email'     => actualiza credentials.email
      // name = 'password'  => actualiza credentials.password
    }))
  }

  async function handleSumbit(event) {
    event.preventDefault() // Evita que recargue la pagina
    const result = await dispatch(loginThunk(credentials))
    // Cómo escribir en el store con useDispatch:
    //  - dispatch() envía una action al store.
    //  - El store la pasa al reducer correspondiente.
    //  - El reducer actualiza el estado.
    //  - Todos los useSelector que lean ese estado se re-ejecutan.
   
    if(loginThunk.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return (
    <main className="page">
      <section className="container">
        <div className={styles.loginContainer}>
          <h2>Inicia sesion o crea una cuenta</h2>

          {error && (
            <StatusMessage 
              title='Error'
              description={error}
              variant="error"
            />
          )}

          <form onSubmit={handleSumbit} className={styles.loginForm}>
            <label>
              <span className={styles.span}>Email:</span>
              <input 
                className={styles.input}
                ref={emailInputRef}
                type="email" 
                name="email" 
                value={credentials.email} 
                placeholder="tu@email.com" 
                onChange={handleChange}
                disabled={loading}
              />
            </label>

            <label>
              <span className={styles.span}>Password:</span>
              <input 
                className={styles.input}
                type="password" 
                name="password" 
                value={credentials.password} 
                placeholder="*********" 
                onChange={handleChange}
                disabled={loading}
              />
            </label>

            <Button type='submit' disabled={loading}>
              {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <Link to={'/register'} className={styles.link}>Crea una cuenta en React Shop Lab</Link>
        </div>
      </section>
    </main>
  )
}

export default LoginPage