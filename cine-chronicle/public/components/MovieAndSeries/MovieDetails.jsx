import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Badge, Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../Footer'
import NavigationBar from '../Navegation,'
import LoadingComponent from '../Loading'
import { ReviewModal } from './ReviewModal'
import { AuthContext } from '../auth/AuthContext'
import { LibraryModal } from './LibraryModal'
import env from '../../utils/configEnv'

export function MovieDetails () {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [details, setDetails] = useState(null)
  const [relatedItems, setRelatedItems] = useState([])
  const [episodesCount, setEpisodesCount] = useState(null)
  const [currentPart, setCurrentPart] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewEpisode, setReviewEpisode] = useState(null)
  const PART_SIZE = 12

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            i: id,
            apikey: env.apiKey,
            r: 'json'
          }
        })
        setDetails(response.data)

        if (response.data.Type === 'series') {
          const seasons = parseInt(response.data.totalSeasons, 10)
          let totalEpisodes = 0

          for (let season = 1; season <= seasons; season++) {
            const seasonResponse = await axios.get('http://www.omdbapi.com/', {
              params: {
                i: id,
                Season: season,
                apikey: env.apiKey,
                r: 'json'
              }
            })
            totalEpisodes += seasonResponse.data.Episodes.length
          }
          setEpisodesCount(totalEpisodes)
        } else {
          setEpisodesCount(1)
        }

        const relatedResponse = await axios.get('http://www.omdbapi.com/', {
          params: {
            i: id,
            apikey: env.apiKey,
            r: 'json'
          }
        })

        if (relatedResponse.data.Type === 'movie' || relatedResponse.data.Type === 'series') {
          const relatedTitle = relatedResponse.data.Title
          const relatedItemsResponse = await axios.get('http://www.omdbapi.com/', {
            params: {
              s: relatedTitle,
              apikey: env.apiKey,
              r: 'json'
            }
          })
          setRelatedItems(relatedItemsResponse.data.Search.filter(item => item.imdbID !== id))
        } else {
          setRelatedItems([])
        }
      } catch (error) {
        console.error('Error fetching details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  if (loading) {
    return <LoadingComponent />
  }

  const getParts = (episodesCount, partSize = PART_SIZE) => {
    const parts = []
    for (let i = 0; i < episodesCount; i += partSize) {
      parts.push(Array.from({ length: Math.min(partSize, episodesCount - i) }, (_, k) => k + 1 + i))
    }
    return parts
  }

  const parts = getParts(episodesCount)

  const handlePreviousPart = () => {
    if (currentPart > 0) {
      setCurrentPart(currentPart - 1)
    }
  }

  const handleNextPart = () => {
    if (currentPart < parts.length - 1) {
      setCurrentPart(currentPart + 1)
    }
  }

  const openReviewModal = (title, episode) => {
    setReviewTitle(title)
    setReviewEpisode(episode)
    setShowReviewModal(true)
  }

  const closeReviewModal = () => {
    setShowReviewModal(false)
  }

  const openLibraryModal = () => {
    setShowLibraryModal(true)
  }

  const closeLibraryModal = () => {
    setShowLibraryModal(false)
  }

  const handleCardClick = (id) => {
    navigate(`/details/${id}`)
  }

  return (
    <>
      <NavigationBar />
      <Container fluid className='py-5'>
        <Container className='text-white rounded-3' style={{ backgroundColor: '#1d556d', padding: '1rem' }}>
          {details && (
            <div className='featured-section mb-5'>
              <Row className='g-0'>
                <Col md={5}>
                  <img
                    src={details.Poster}
                    alt={details.Title}
                    className='img-fluid rounded-3'
                    style={{ height: '405px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={7}>
                  <Card className='h-100'>
                    <Card.Body>
                      <Card.Title>{details.Title}</Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {details.Year} | {details.Type.charAt(0).toUpperCase() + details.Type.slice(1)}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Director:</strong> {details.Director}
                      </Card.Text>
                      <Card.Text>
                        <strong>Actors:</strong> {details.Actors}
                      </Card.Text>
                      <Card.Text>
                        <strong>Runtime:</strong> {details.Runtime}
                      </Card.Text>
                      <div className='mb-2'>
                        <strong>Genres:</strong>
                        {details.Genre.split(',').map((genre, index) => (
                          <Badge key={index} pill bg='secondary' className='mx-1'>
                            {genre.trim()}
                          </Badge>
                        ))}
                      </div>
                      <Card.Text>
                        <strong>Plot:</strong> {details.Plot}
                      </Card.Text>
                      {user && (
                        <Button variant='primary' onClick={openLibraryModal} style={{ background: '#1389b6' }}>
                          Añadir a Mi Biblioteca
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Container>

        <Container className='mt-3 rounded-2 p-4' style={{ background: 'linear-gradient(-45deg, #3e454c 20%, #125c7a 80%)' }}>
          <div style={{ paddingLeft: '40px', backgroundColor: 'rgba(0, 0, 0, 0.6' }}>
            <h2 className='section-title text-white text-center mb-3'>Películas o Series Relacionadas</h2>
          </div>
          <Row className='d-flex flex-wrap p-0'>
            {relatedItems.length > 0
              ? (
                  relatedItems.map((item) => (
                    <Col key={item.imdbID} xs={6} md={4} lg={2} className='mb-4'>
                      <div
                        className='d-flex flex-column justify-content-end'
                        style={{
                          width: '100%',
                          height: '306px',
                          cursor: 'pointer',
                          backgroundImage: `url(${item.Poster})`,
                          backgroundSize: 'cover',
                          border: '4px solid white',
                          borderRadius: '4px'
                        }}
                        onClick={() => handleCardClick(item.imdbID)}
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
                          {item.Title}
                        </div>
                      </div>
                    </Col>
                  ))
                )
              : (
                <Col>
                  <p className='text-center text-white'>No hay series o películas relacionadas.</p>
                </Col>
                )}
          </Row>
        </Container>

        <Container className=' mt-3 pb-2 rounded-3' style={{ backgroundColor: '#1d556d' }}>
          <div className='featured-section mb-5'>
            <h2 className='section-title text-center mb-3 text-white'>Capítulos o Episodios</h2>
            {episodesCount > 1
              ? (
                <>
                  <ButtonGroup className='mb-3 d-flex justify-content-center'>
                    <Button variant='secondary' onClick={handlePreviousPart} disabled={currentPart === 0}>
                      &laquo; Anterior
                    </Button>
                    {parts.map((_, index) => (
                      <Button
                        key={index}
                        variant={index === currentPart ? 'primary' : 'secondary'}
                        onClick={() => setCurrentPart(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    <Button variant='secondary' onClick={handleNextPart} disabled={currentPart === parts.length - 1}>
                      Siguiente &raquo;
                    </Button>
                  </ButtonGroup>
                  <Row xs={1} md={2} lg={3} className='g-4'>
                    {parts[currentPart].map((episode) => (
                      <Col key={episode}>
                        <Card className='h-100'>
                          <Card.Header>
                            Capítulo {episode}
                            <Button
                              variant='info'
                              className='float-end p-1 text-white'
                              onClick={() => openReviewModal(`Capítulo ${episode}`, episode)}
                            >
                              Reseña
                            </Button>
                          </Card.Header>
                          <Card.Body>
                            Contenido del Capítulo {episode}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
                )
              : (
                <Row>
                  <Col>
                    <Card>
                      <Card.Header>
                        Capítulo 1
                        <Button
                          variant='info'
                          className='float-end p-1 text-white'
                          onClick={() => openReviewModal('Capítulo 1', 1)}
                        >
                          Reseña
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        Contenido del Capítulo 1
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                )}
          </div>
        </Container>
      </Container>
      {user && (
        <>
          <ReviewModal
            show={showReviewModal}
            handleClose={closeReviewModal}
            title={reviewTitle}
            username={user.username}
            userId={user._id}
            itemId={id}
            episode={reviewEpisode}
          />
          <LibraryModal
            show={showLibraryModal}
            handleClose={closeLibraryModal}
            userId={user._id}
            itemId={id}
          />
        </>
      )}
      <Footer />
    </>
  )
};
export default MovieDetails
