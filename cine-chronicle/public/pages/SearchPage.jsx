import { Alert, Col, Container, Row } from 'react-bootstrap'
import NavigationBar from '../components/Navegation,'
import LoadingComponent from '../components/Loading'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import env from '../utils/configEnv'

export function SearchPage () {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('https://www.omdbapi.com/', {
          params: {
            s: query,
            apikey: env.apiKey,
            r: 'json'
          }
        })
        setResults(response.data.Search || [])
      } catch (error) {
        console.error('Error al obtener resultados de búsqueda:', error)
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
      <Container className='mt-3 rounded-2 p-4' style={{ background: 'linear-gradient(-45deg, #3e454c 20%, #125c7a 80%)' }}>
        <div style={{ paddingLeft: '40px', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <h2 className='section-title text-white text-center mb-3'>Resultados de búsqueda para: "{query}"</h2>
        </div>
        {results.length === 0
          ? (
            <Alert variant='info'>
              No se encontraron resultados.
            </Alert>
            )
          : (
            <Row className='d-flex flex-wrap p-0'>
              {results.map((result) => (
                <Col key={result.imdbID} xs={6} md={4} lg={2} className='mb-4'>
                  <div
                    className='d-flex flex-column justify-content-end'
                    style={{
                      width: '100%',
                      height: '306px',
                      cursor: 'pointer',
                      backgroundImage: `url(${result.Poster})`,
                      backgroundSize: 'cover',
                      border: '4px solid white',
                      borderRadius: '4px'
                    }}
                    onClick={() => navigate(`/details/${result.imdbID}`)}
                  >
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
                      {result.Title}
                    </div>
                  </div>
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
