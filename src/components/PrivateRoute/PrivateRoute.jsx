import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute ({ children, requiredRole }) {
  const { user, checkingAuth } = useSelector((state) => state.auth)

  if (checkingAuth) {
    return <p>Comprobando sesión...</p>
  }

  if (!user) {
    return <Navigate to={'/login'} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={'/'} replace />
  }

  return children
}

export default PrivateRoute