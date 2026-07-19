import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import styles from './RegisterPage.module.css'

function RegisterPage() {
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
      await registerUser(formData)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <main>
      <section>
        <p>Register</p>
        <h2>Crear una cuenta</h2>

        <form onSubmit={handleSumbit}>
          <label>
            <span>Email</span>
            <input 
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
            <span>Password</span>
            <input type="password" 
              name="password" 
              value={formData.password} 
              placeholder="*********" 
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            Registrarse
          </button>
        </form>

        {error && (
          <StatusMessage 
            title='Error al ingresar a la aplicacion'
            description={error}
          />
        )}
      </section>
    </main>
  )
}

export default RegisterPage