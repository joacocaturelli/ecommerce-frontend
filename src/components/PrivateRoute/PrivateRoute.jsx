import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

function PrivateRoute ({ children, requiredRole }) {

  const location = useLocation()

  const { user, checkingAuth } = useSelector((state) => state.auth)

  if (checkingAuth) {
    return <p>Comprobando sesión...</p>
  }

  if (!user) {
    return <Navigate to={'/login'} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    // {from: location} guarda la ruta actual para que pueda 
    // ser usada en la pagina a donde se va a redirigir el usuario
    return <Navigate to={'/'} replace state={{from: location}} /> 
  }

  return children
}

export default PrivateRoute