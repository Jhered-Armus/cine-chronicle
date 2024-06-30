import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
// import '../../pages/styles/Auth.css'
import { AuthContext } from './AuthContext'
import NavigationBar from '../Navegation,'
import Footer from '../Footer'
import env from '../../utils/configEnv'

export function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${env.backendUrl}/api/users/login`, formData)
      // Almacenar el token de autenticación en sessionStorage en lugar de localStorage
      // eslint-disable-next-line no-undef
      sessionStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      navigate('/catalog')
    } catch (error) {
      console.error(error.response.data)
      if (error.response && error.response.data) {
        setError(error.response.data.msg)
      } else {
        setError('Error en iniciar sesion')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='d-flex flex-column vh-100' style={{ background: 'linear-gradient(-45deg, #3e454c 20%, #125c7a 80%)' }}>
      <NavigationBar />
      <Container className='flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
        <div className='p-5 rounded-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', width: '100%', maxWidth: '400px' }}>
          <h2 className='text-center text-white mb-4'>Bienvenido!</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Correo electrónico...'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='mb-3'
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='Contraseña'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='mb-3'
              />
            </Form.Group>
            <div className='d-flex justify-content-between align-items-center'>
              <Button
                style={{ background: '#1389b6', border: 'none' }}
                type='submit'
                className='btn-login'
                disabled={loading}
              >
                {loading ? <Spinner animation='border' size='sm' /> : 'Iniciar'}
              </Button>
              <NavLink to='/register' className='btn-signup ml-3' style={{ color: '#aae9f7' }}>
                Registrarse
              </NavLink>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  )
}
export default Login
