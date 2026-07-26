import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute ({ children, requiredRole }) {
  const { token, user } = useSelector((state) => state.auth)

  if (!token) {
    return <Navigate to={'/login'} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={'/'} replace />
  }

  return children
}

export default PrivateRoute