import React, { useContext } from 'react'
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { AuthContext } from './auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { formatUsername } from '../utils/format'

const NavigationBar = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    // eslint-disable-next-line no-undef
    sessionStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Navbar.Brand href='/catalog'>Movie Catalog</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {user
            ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                    <FaUser style={{ marginRight: '8px' }} />
                    {formatUsername(user.username)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link href='/library'>Mi Biblioteca</Nav.Link>
              </>
              )
            : (
              <>
                <Nav.Link href='/login'>Login</Nav.Link>
                <Nav.Link href='/register'>Sign Up</Nav.Link>
              </>
              )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
