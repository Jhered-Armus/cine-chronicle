import React, { useContext } from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'
import './styles/home.css'
import { AuthContext } from '../components/auth/AuthContext'
import NavigationBar from '../components/Navegation,'
import Footer from '../components/Footer'

export function Home () {
  const { user } = useContext(AuthContext)

  const containerStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }

  const contentStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '800px',
    margin: 'auto',
    color: 'white'
  }

  return (
    <div style={containerStyle}>
      <NavigationBar />
      <Container style={contentStyle}>
        <h1 className='mb-4'>¡Bienvenido a Cine Chronicle!</h1>
        <h3 className='mb-3'>Tu compañero ideal para descubrir y catalogar tus películas y series favoritas.</h3>
        <p className='mb-4'>Explora, guarda y organiza todos los títulos que amas. Desde los últimos estrenos hasta los clásicos de siempre, Cine Chronicle te ayuda a llevar un registro personalizado de lo que has visto y lo que quieres ver.</p>
        <Row className='text-center mb-4'>
          <Col>
            <h4>🎬 Explora</h4>
            <p>Descubre nuevas películas y series que coincidan con tus gustos.</p>
          </Col>
          <Col>
            <h4>⭐ Favoritos</h4>
            <p>Marca tus títulos preferidos y tenlos siempre a mano.</p>
          </Col>
          <Col>
            <h4>📚 Biblioteca</h4>
            <p>Organiza tus títulos en categorías como Viendo, En Espera, y más.</p>
          </Col>
        </Row>
        {!user
          ? (
            <>
              <Button style={{ background: '#1389b6', border: 'white solid 1px' }} href='/login' className='me-3'>Iniciar Sesión</Button>
              <Button style={{ background: 'transparent', border: 'white solid 1px' }} className='text-white' href='/register'>Registrarse</Button>
            </>
            )
          : <Button style={{ background: '#1389b6' }} href='/catalog'>Ir Catalogo</Button>}
      </Container>
      <Footer />
    </div>
  )
}
