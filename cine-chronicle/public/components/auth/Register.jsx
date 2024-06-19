import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

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
        setError('Error signing up')
      }
    }
  }

  return (
    <Container fluid className='auth-container'>
      <Row className='justify-content-center align-items-center'>
        <div className='auth-form'>
          <h2>Registro</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicUsername'>
              <Form.Control
                type='text'
                placeholder='Nombre de Usuario'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Correo Electronico'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
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
              />
            </Form.Group>
            <Button variant='primary' type='submit' className='btn-signup'>
              Registrase
            </Button>
            <NavLink to='/login' className='btn-login'>
              Iniciar Sesion
            </NavLink>
          </Form>
          <div className='auth-footer'>
            <p>Follow us:</p>
            <div className='social-icons'>
              <a href='#'>Facebook</a>
              <a href='#'>Twitter</a>
              <a href='#'>Instagram</a>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  )
}
export default Register
