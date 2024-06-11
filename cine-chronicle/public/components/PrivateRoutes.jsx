import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../components/auth/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  return user
    ? (
        children
      )
    : (
      <Navigate to='/login' replace state={{ from: location }} />
      )
}

export default PrivateRoute
