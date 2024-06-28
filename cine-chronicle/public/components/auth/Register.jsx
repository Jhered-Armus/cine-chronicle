import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import NavigationBar from '../Navegation,'
import Footer from '../Footer'

export function Register () {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData)
      console.log(res.data)
      navigate('/login')
    } catch (error) {
      console.error(error.response.data) // Muestra el mensaje de error del servidor
      if (error.response && error.response.data) {
        setError(error.response.data.msg)
      } else {
        setError('Error al registrarse')
      }
    }
  }

  return (
    <div className='d-flex flex-column vh-100' style={{ background: 'linear-gradient(-45deg, #3e454c 20%, #125c7a 80%)' }}>
      <NavigationBar />
      <Container className='flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
        <div className='p-5 rounded-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', width: '100%', maxWidth: '400px' }}>
          <h2 className='text-center text-white mb-4'>Registro</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicUsername'>
              <Form.Control
                type='text'
                placeholder='Nombre de usuario'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
                className='mb-3'
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Correo electrónico'
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
              <Button style={{ background: '#1389b6', border: 'none' }} type='submit' className='btn-signup'>
                Registrarse
              </Button>
              <NavLink to='/login' className='btn-login ml-3' style={{ color: '#aae9f7' }}>
                Iniciar sesión
              </NavLink>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  )
}
export default Register
