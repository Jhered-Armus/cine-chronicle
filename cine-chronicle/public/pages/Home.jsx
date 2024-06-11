import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './styles/home.css'

export function Home () {
  return (
    <Container className='home-container'>
      <Row className='justify-content-center align-items-center vh-100'>
        <Col md={6} className='text-center'>
          <h1>Welcome to Cine Chronicle</h1>
          <p>Sign in or create an account to get started</p>
          <div className='home-actions'>
            <NavLink to='/login'>

              <Button variant='primary' className='home-btn'>Login</Button>
            </NavLink>
            <NavLink to='/register'>
              <Button variant='secondary' className='home-btn'>Sign Up</Button>
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
