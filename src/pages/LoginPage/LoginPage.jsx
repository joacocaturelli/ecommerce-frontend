import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import styles from './LoginPage.module.css'

function LoginPage() {
  const navigate = useNavigate()

  const emailInputRef = useRef(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

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
      await loginUser(formData)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main>
      <section>
        <p>Login</p>
        <h2>Acceder a la aplicacion</h2>

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
            />
          </label>

          <label>
            <span>Password</span>
            <input type="password" 
              name="password" 
              value={formData.password} 
              placeholder="*********" 
              onChange={handleChange}
            />
          </label>

          <button type="submit">
            Entrar
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

export default LoginPage