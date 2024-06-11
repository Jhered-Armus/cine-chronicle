import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from './auth/AuthContext'

const PublicRoute = ({ restricted, children }) => {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  return !user || !restricted ? (children) : (<Navigate to='/catalog' replace state={{ from: location }} />)
}

export default PublicRoute
