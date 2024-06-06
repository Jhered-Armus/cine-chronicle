import { Route, BrowserRouter, Routes } from 'react-router-dom'
import React from 'react'
import { Home } from '../pages/Home'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'

export function RoutesPages () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
