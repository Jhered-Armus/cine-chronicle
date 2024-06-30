import React, { useContext } from 'react'
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { AuthContext } from './auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { formatUsername } from '../utils/format'
import SearchBar from './SearchBar'
import logo from '../assets/logo_horizontal.png'

const NavigationBar = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    // eslint-disable-next-line no-undef
    sessionStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <Navbar style={{ background: '#0e3143' }} variant='dark' expand='lg'>
      <Navbar.Brand href='/catalog'>
        <img
          src={logo} alt='logo'
          width='170'
          height='30'
          className='d-inline-block align-top'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {user == null
            ? (
              <>
                <Nav.Link href='/login'>Iniciar Sesion</Nav.Link>
                <Nav.Link href='/register'>Registrarse</Nav.Link>
              </>
              )
            : (
              <>
                <Dropdown>
                  <Dropdown.Toggle style={{ background: '#1389b6' }} id='dropdown-basic'>
                    <FaUser style={{ marginRight: '8px' }} />
                    {formatUsername(user.username)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Cerrar sesion</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link href='/library'>Mi Biblioteca</Nav.Link>
                {/* Buscador */}
                <SearchBar />
              </>
              )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavigationBar
