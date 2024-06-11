import { Route, BrowserRouter, Routes } from 'react-router-dom'
import React from 'react'
import { Home } from '../pages/Home'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import { CatalogMovie } from '../pages/CatalogMovie'
import PublicRoute from '../components/PublicRoutes'
import PrivateRoute from '../components/PrivateRoutes'
import MovieDetails from '../components/MovieAndSeries/MovieDetails'
// import NavigationBar from '../components/Navegation,'

export function RoutesPages () {
  return (
    <BrowserRouter>
      {/* <NavigationBar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<PrivateRoute><CatalogMovie /></PrivateRoute>} />
        <Route path='/login/*' element={<PublicRoute restricted><Login /></PublicRoute>} />
        <Route path='/register/*' element={<PublicRoute restricted><Register /></PublicRoute>} />
        <Route path='/details/:id' element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
