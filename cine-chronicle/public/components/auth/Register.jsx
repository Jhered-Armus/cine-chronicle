import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'

export function Register () {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [message, setMessage] = useState(null)
  const { username, email, password } = formData

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData)
      setMessage({
        type: 'success',
        text: res.data.message
      })
    } catch (err) {
      setMessage({ type: 'danger', text: err.response.data.msg })
    }
  }

  return (
    <Container>
      <h2>Register</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </Form.Group>

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

        <Button variant='primary' type='submit'>Register</Button>
      </Form>
    </Container>
  )
}

export default Register
