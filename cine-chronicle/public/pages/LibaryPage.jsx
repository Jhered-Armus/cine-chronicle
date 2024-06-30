import { Alert, Badge, Button, ButtonGroup, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavigationBar from '../components/Navegation,'
import LoadingComponent from '../components/Loading'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import env from '../utils/configEnv'

const ITEMS_PER_PAGE = 10

export function LibraryPage () {
  const { user, loading } = useContext(AuthContext)
  const [library, setLibrary] = useState([])
  const [loadingLibrary, setLoadingLibrary] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!user) return

      try {
        const response = await axios.get(`${env.backendUrl}/api/library/${user._id}`)
        const libraryEntries = await Promise.all(
          response.data.entries.map(async (entry) => {
            const itemResponse = await axios.get(`https://www.omdbapi.com/?i=${entry.itemId}&apikey=${env.apiKey}`)
            return { ...entry, itemDetails: itemResponse.data }
          })
        )
        setLibrary(libraryEntries)
      } catch (error) {
        console.error('Error fetching library:', error)
      } finally {
        setLoadingLibrary(false)
      }
    }

    if (!loading) {
      fetchLibrary()
    }
  }, [user, loading])

  if (loading) {
    return <LoadingComponent />
  }

  if (!user) {
    return (
      <div className='d-flex flex-column vh-100'>
        <NavigationBar />
        <Container className='flex-grow-1 d-flex flex-column justify-content-center align-items-center '>
          <h1 className='text-white'>No has iniciado sesión</h1>
          <p className='text-white'>Inicia sesion para poder acceder al contendio</p>
          <Button href='/login' style={{ background: '#1389b6' }}>Iniciar Sesion</Button>
        </Container>
        <Footer />
      </div>
    )
  }

  if (loadingLibrary) {
    return <LoadingComponent />
  }

  const filterEntriesByStatus = (status) => {
    return status === 'Todos'
      ? library
      : library.filter(entry => entry.status === status)
  }

  const paginateEntries = (entries) => {
    const start = currentPage * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return entries.slice(start, end)
  }

  const totalPages = Math.ceil(library.length / ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageSelect = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleCardClick = (itemId) => {
    navigate(`/details/${itemId}`)
  }

  const statuses = ['Todos', 'Favorito', 'Viendo', 'En Espera', 'Abandonado']

  return (
    <>
      <NavigationBar />
      <Container fluid className='d-flex flex-column mt-4' style={{ minHeight: 'calc(100vh - 130px)' }}>
        <Tab.Container defaultActiveKey='Todos'>
          <Row>
            <Col sm={3}>
              <Nav variant='pills' className='flex-column'>
                {statuses.map(status => (
                  <Nav.Item
                    key={status}
                    className='mb-2'
                  >
                    <Nav.Link className='text-white' style={{ }} eventKey={status}>{status}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {statuses.map(status => (
                  <Tab.Pane eventKey={status} key={status}>
                    {filterEntriesByStatus(status).length === 0
                      ? (
                        <Alert variant='info'>
                          No hay películas o series en esta categoría.
                        </Alert>
                        )
                      : (
                        <>
                          <Container className='mt-3 rounded-2 p-2' style={{ background: 'linear-gradient(-45deg, #3e454c 20%, #125c7a 80%)' }}>
                            <Row className='d-flex flex-wrap p-0'>
                              {paginateEntries(filterEntriesByStatus(status)).map(entry => (
                                <Col key={entry.itemId} xs={6} md={4} lg={3} className='mb-4'>
                                  <div
                                    className='d-flex flex-column justify-content-end position-relative'
                                    style={{
                                      width: '100%',
                                      height: '306px',
                                      cursor: 'pointer',
                                      backgroundImage: `url(${entry.itemDetails.Poster})`,
                                      backgroundSize: 'cover',
                                      border: '4px solid white',
                                      borderRadius: '4px'
                                    }}
                                    onClick={() => handleCardClick(entry.itemId)}
                                  >
                                    <div className='position-absolute top-0 start-0 m-2'>
                                      <Badge pill bg='secondary' className='mx-1'>
                                        {entry.status}
                                      </Badge>
                                    </div>
                                    <div
                                      className='text-center text-white'
                                      style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                        padding: '5px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {entry.itemDetails.Title}
                                    </div>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Container>
                          <ButtonGroup className='mt-3'>
                            <Button variant='secondary' onClick={handlePreviousPage} disabled={currentPage === 0}>
                              &laquo; Anterior
                            </Button>
                            {Array.from({ length: totalPages }, (_, index) => (
                              <Button
                                key={index}
                                variant={index === currentPage ? 'primary' : 'secondary'}
                                onClick={() => handlePageSelect(index)}
                              >
                                {index + 1}
                              </Button>
                            ))}
                            <Button variant='secondary' onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                              Siguiente &raquo;
                            </Button>
                          </ButtonGroup>
                        </>
                        )}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <div style={{ flexGrow: 1 }} />
      </Container>
      <Footer />
    </>
  )
};

export default LibraryPage
