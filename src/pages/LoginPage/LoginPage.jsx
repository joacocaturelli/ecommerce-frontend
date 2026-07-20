import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { Link } from "react-router-dom";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import Button from '../../components/Button/Button';
import styles from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate()

  const emailInputRef = useRef(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  function handleChange(event) {
    const {name, value} = event.target
    setFormData((prev) => ({
      ...prev, // Copiamos los datos que ya habia
      [name]: value 
      // Actualiza solo el campo que cambio (email o password)
      // name = 'email'     => actualiza formData.email
      // name = 'password'  => actualiza formData.password
    }))
  }

  async function handleSumbit(event) {
    event.preventDefault() // Evita que recargue la pagina
    setError(null)

    if(!formData.email || !formData.password) {
      setError('Credenciales incorrectas')
      return
    }

    try {
      setIsSubmitting(true)
      await loginUser(formData)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page">
      <section className="container">
        <div className={styles.loginContainer}>
          <h2>Inicia sesion o crea una cuenta</h2>

          <form onSubmit={handleSumbit} className={styles.loginForm}>
            <label>
              <span className={styles.span}>Email:</span>
              <input 
                className={styles.input}
                ref={emailInputRef}
                type="email" 
                name="email" 
                value={formData.email} 
                placeholder="tu@email.com" 
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </label>

            <label>
              <span className={styles.span}>Password:</span>
              <input 
                className={styles.input}
                type="password" 
                name="password" 
                value={formData.password} 
                placeholder="*********" 
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </label>

            <Button type='submit' disabled={isSubmitting}>Entrar</Button>
          </form>

          <Link to={'/register'} className={styles.link}>Crea una cuenta en React Shop Lab</Link>

          {error && (
            <StatusMessage 
              title='Error al ingresar a la aplicacion'
              description={error}
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default LoginPage