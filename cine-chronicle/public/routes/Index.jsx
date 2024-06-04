import { Route, BrowserRouter, Routes } from 'react-router-dom'
import React from 'react'
import { Home } from '../pages/Home'
import { Pruba } from '../pages/PaginaPrueba'

export function RoutesPages () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prueba' element={<Pruba />} />
      </Routes>
    </BrowserRouter>
  )
}
