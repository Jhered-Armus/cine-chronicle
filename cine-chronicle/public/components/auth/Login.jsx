import React, { useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Form } from 'react-bootstrap'

export function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState(null)

  const { email, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData)
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('token', res.data.token)
      }
      setMessage({ type: 'success', text: 'Login successful' })
    } catch (err) {
      setMessage({ type: 'danger', text: err.response.data.msg })
    }
  }

  return (
    <Container>
      <h2>Login</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Button variant='primary' type='submit'>Login</Button>
      </Form>
    </Container>
  )
}

export default Login
