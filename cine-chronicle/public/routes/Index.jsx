import { Route, BrowserRouter, Routes } from 'react-router-dom'
import React from 'react'
import { Home } from '../pages/Home'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import { CatalogMovie } from '../pages/CatalogMovie'
import PublicRoute from '../components/PublicRoutes'
import PrivateRoute from '../components/PrivateRoutes'
import MovieDetails from '../components/MovieAndSeries/MovieDetails'
import { LibraryPage } from '../pages/LibaryPage'
import { SearchPage } from '../pages/SearchPage'
import NotFound from '../components/NotFoundPage'
// import NavigationBar from '../components/Navegation,'

export function RoutesPages () {
  return (
    <BrowserRouter>
      {/* <NavigationBar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<PrivateRoute><CatalogMovie /></PrivateRoute>} />
        <Route path='/login' element={<PublicRoute restricted><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute restricted><Register /></PublicRoute>} />
        <Route path='/details/:id' element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
        <Route path='/library' element={<LibraryPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
