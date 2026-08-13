import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../store/features/authSlice";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import Button from "../../components/Button/Button";
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const emailInputRef = useRef(null)

  const { loading, error } = useSelector((state) => state.auth)

  const [credentials, setCredentials] = useState({
    name: "",
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
      // name = 'name'      => actualiza credentials.name
      // name = 'email'     => actualiza credentials.email
      // name = 'password'  => actualiza credentials.password
    }))
  }

  async function handleSumbit(event) {
    event.preventDefault() // Evita que recargue la pagina

    const result = await dispatch(registerThunk(credentials))

    if(registerThunk.fulfilled.match(result)) {
      navigate('/login')
    }
  }

  return (
    <main className="page">
      <section className="container">

        <div className={styles.registerContainer}>
          <h2>Crear una cuenta</h2>

          {error && (
            <StatusMessage 
              title='Error'
              description={error}
              variant="error"
            />
          )}

          <form onSubmit={handleSumbit} className={styles.registerForm}>

            <label>
              <span className={styles.span}>Nombre de usuario:</span>

              <input 
                className={styles.input}
                type="text" 
                name="name" 
                value={credentials.name} 
                placeholder="Nombre" 
                onChange={handleChange}
                disabled={loading}
              />
            </label>

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

            <Button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
            
          </form>
        </div>

      </section>
    </main>
  )
}

export default RegisterPage