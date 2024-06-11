import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      // eslint-disable-next-line no-undef
      const token = sessionStorage.getItem('token')
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/auth', {
            headers: { 'x-auth-token': token }
          })
          setUser(res.data)
        } catch (err) {
          console.error(err)
          // Si la solicitud a la API de autenticación falla,
          // debes establecer el estado de user en null y eliminar el token de autenticación
          setUser(null)
          // eslint-disable-next-line no-undef
          sessionStorage.removeItem('token')
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
