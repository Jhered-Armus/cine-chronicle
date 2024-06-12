import { Alert, Badge, Button, ButtonGroup, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavigationBar from '../components/Navegation,'
import LoadingComponent from '../components/Loading'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/auth/AuthContext'
import { key } from '../utils/format'
import { useNavigate } from 'react-router-dom'

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
        const response = await axios.get(`http://localhost:5000/api/library/${user._id}`)
        const libraryEntries = await Promise.all(
          response.data.entries.map(async (entry) => {
            const itemResponse = await axios.get(`http://www.omdbapi.com/?i=${entry.itemId}&apikey=${key}`)
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
    return <p>Debe iniciar sesión para ver su biblioteca.</p>
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
      <Container fluid className='mt-3'>
        <Tab.Container defaultActiveKey='Todos'>
          <Row>
            <Col sm={3}>
              <Nav variant='pills' className='flex-column'>
                {statuses.map(status => (
                  <Nav.Item key={status}>
                    <Nav.Link eventKey={status}>{status}</Nav.Link>
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
                          <Row xs={1} md={2} lg={3} className='g-4'>
                            {paginateEntries(filterEntriesByStatus(status)).map(entry => (
                              <Col key={entry.itemId}>
                                <Card onClick={() => handleCardClick(entry.itemId)} style={{ cursor: 'pointer' }}>
                                  <Card.Img
                                    variant='top'
                                    src={entry.itemDetails.Poster}
                                    style={{ height: '305px', objectFit: 'cover' }}
                                  />
                                  <Card.Body>
                                    <Card.Title>{entry.itemDetails.Title}</Card.Title>
                                    <Badge pill bg='secondary' className='mx-1'>
                                      {entry.status}
                                    </Badge>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
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
      </Container>
      <Footer />
    </>
  )
};

export default LibraryPage
