import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from './auth/AuthContext'

const PublicRoute = ({ restricted, children }) => {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  // Si el usuario no está autenticado o la ruta no está restringida, muestra el componente children
  if (!user || !restricted) {
    return children
  }

  // Si el usuario está autenticado y trata de acceder a una ruta restringida, redirige a la página anterior
  return <Navigate to={location.state?.from || '/'} replace />
}

export default PublicRoute
