import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
          setUser(null)
          // eslint-disable-next-line no-undef
          sessionStorage.removeItem('token')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
