import React from 'react'
import NavigationBar from './Navegation,'
import Footer from './Footer'
import { Container } from 'react-bootstrap'

export function NotFound () {
  return (
    <div className='d-flex flex-column vh-100'>
      <NavigationBar />
      <Container className='flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
        <h1 className='text-white'>404 - Página no encontrada</h1>
        <p className='text-white'>Lo sentimos, la página que estás buscando no existe.</p>
      </Container>
      <Footer />
    </div>
  )
};

export default NotFound
