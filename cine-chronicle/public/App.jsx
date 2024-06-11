import React from 'react'
import { RoutesPages } from './routes/Index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AuthProvider } from './components/auth/AuthContext'

export function App () {
  return (
    <div>
      <AuthProvider>
        <RoutesPages />
      </AuthProvider>
    </div>
  )
}
