import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import '../../pages/styles/Auth.css'
import { AuthContext } from './AuthContext'

export function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData)
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
        setError('Error logging in')
      }
    }
  }

  return (
    <Container fluid className='auth-container'>
      <Row className='justify-content-center align-items-center'>
        <div className='auth-form'>
          <h2>Hello, welcome!</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Email address'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant='primary' type='submit' className='btn-login'>
              Login
            </Button>
            <NavLink to='/register' className='btn-signup'>
              Sign up
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
};

export default Login
