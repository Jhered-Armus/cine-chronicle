import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap'
import NavigationBar from '../components/Navegation,'
import LoadingComponent from '../components/Loading'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { key } from '../utils/format'
import Footer from '../components/Footer'

export function SearchPage () {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            s: query,
            apikey: key,
            r: 'json'
          }
        })
        setResults(response.data.Search || [])
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchSearchResults()
    }
  }, [query])

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <>
      <NavigationBar />
      <Container fluid className='mt-3'>
        <h2>Resultados de búsqueda para: "{query}"</h2>
        {results.length === 0
          ? (
            <Alert variant='info'>
              No se encontraron resultados.
            </Alert>
            )
          : (
            <Row xs={1} md={2} lg={3} className='g-4'>
              {results.map((result) => (
                <Col key={result.imdbID}>
                  <Card>
                    <Card.Img
                      variant='top'
                      src={result.Poster}
                      style={{ height: '305px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{result.Title}</Card.Title>
                      <Button variant='primary' onClick={() => navigate(`/details/${result.imdbID}`)}>
                        Ver Detalles
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            )}
      </Container>
      <Footer />
    </>
  )
}

export default SearchPage
