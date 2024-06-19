import { useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import NavigationBar from '../components/Navegation,'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import axios from 'axios'
import Slider from 'react-slick'
import { formatUsername, key } from '../utils/format'
import LoadingComponent from '../components/Loading'

export function CatalogMovie () {
  const [featuredItem, setFeaturedItem] = useState(null)
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [combinedList, setCombinedList] = useState([])
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef(null)
  const [hideDots, setHideDots] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetails = async (imdbID) => {
      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          i: imdbID,
          apikey: key,
          r: 'json'
        }
      })
      return response.data
    }

    const fetchData = async () => {
      try {
        const fetchMovies = async (page) => {
          const response = await axios.get('http://www.omdbapi.com/', {
            params: {
              s: 'movie',
              apikey: key,
              type: 'movie',
              r: 'json',
              page
            }
          })
          return response.data.Search
        }

        const fetchSeries = async (page) => {
          const response = await axios.get('http://www.omdbapi.com/', {
            params: {
              s: 'series',
              apikey: key,
              type: 'series',
              r: 'json',
              page
            }
          })
          return response.data.Search
        }

        const moviesListPage1 = await fetchMovies(1)
        const moviesListPage2 = await fetchMovies(2)
        const seriesListPage1 = await fetchSeries(1)
        const seriesListPage2 = await fetchSeries(2)

        const moviesList = await Promise.all(
          [...moviesListPage1, ...moviesListPage2].slice(0, 15).map((item) => fetchDetails(item.imdbID))
        )
        const seriesList = await Promise.all(
          [...seriesListPage1, ...seriesListPage2].slice(0, 15).map((item) => fetchDetails(item.imdbID))
        )
        const combinedList = [...moviesList, ...seriesList]

        setMovies(moviesList)
        setSeries(seriesList)
        setCombinedList(combinedList)
        setFeaturedItem(combinedList[0])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext()
      }
    }, 60000) // Cambia cada 60 segundos

    return () => clearInterval(interval)
  }, [])

  const handleBeforeChange = (oldIndex, newIndex) => {
    setFeaturedItem(combinedList[newIndex])
  }

  const settings = {
    dots: !hideDots,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: handleBeforeChange,
    ref: sliderRef
  }
  useEffect(() => {
    const handleResize = () => {
      setHideDots(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (loading) {
    return <LoadingComponent />
  }

  const handleCardClick = (id) => {
    navigate(`/details/${id}`)
  }

  return (
    <>
      <NavigationBar />
      <Container fluid>
        {/* Primera sección: Película/Serie destacada y carrusel */}
        <Container className='mt-3 rounded-2' style={{ background: 'linear-gradient(-45deg, #3e454c 20%, #125c7a 80%)' }}>
          {featuredItem && (
            <div className='featured-section mb-5'>
              <Row className=''>
                <Col className='d-flex justify-content-center' md={5}>
                  <img
                    src={featuredItem.Poster} alt={featuredItem.Title} className='img-fluid m-3 rounded-3'
                    style={{ height: '405px', objectFit: 'cover' }}
                  />
                </Col>
                <Col className='d-flex justify-content-lg-center' md={5}>
                  <Card className='m-3'>
                    <Card.Body>
                      <Card.Title>{featuredItem.Title}</Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {featuredItem.Year} | {formatUsername(featuredItem.Type)}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Runtime:</strong> {featuredItem.Runtime}
                      </Card.Text>
                      <div className='mb-2'>
                        <strong>Genres:</strong>
                        {featuredItem.Genre.split(',').map((genre, index) => (
                          <Badge key={index} pill bg='secondary' className='mx-1'>
                            {genre.trim()}
                          </Badge>
                        ))}
                      </div>
                      <Card.Text>
                        <strong>Plot:</strong> {featuredItem.Plot}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Container className='pb-4'>
                <Slider {...settings} className='mt-4 ' style={{ background: 'rgb(95, 113, 123, 0.2)' }}>
                  {combinedList.map((item) => (
                    <div key={item.imdbID} className='carousel-item'>
                      <img
                        src={item.Poster} alt={item.Title} className='img-fluid'
                        style={{ height: '305px', width: '205px', objectFit: 'cover', margin: '10px' }}
                        onClick={() => handleCardClick(item.imdbID)}
                      />
                    </div>
                  ))}
                </Slider>
              </Container>
            </div>
          )}
        </Container>

        {/* Segunda sección: Películas */}
        <Container className='mt-3 rounded-2 p-4' style={{ background: 'linear-gradient(-45deg, #3e454c 20%, #125c7a 80%)' }}>
          <div className='rounded-top-4' style={{ paddingLeft: '40px', background: '#144d66' }}>
            <h2 className='section-title'>Películas</h2>
          </div>
          <Row className='d-flex flex-wrap p-0'>
            {movies.map((movie, index) => (
              <Col key={movie.imdbID} xs={6} md={4} lg={2} className='mb-4 '>
                <div
                  className='d-flex flex-column justify-content-end'
                  style={{
                    width: '100%',
                    height: '306px',
                    cursor: 'pointer',
                    backgroundImage: `url(${movie.Poster})`,
                    backgroundSize: 'cover',
                    border: '4px solid white',
                    borderRadius: '4px'
                  }}
                  onClick={() => handleCardClick(movie.imdbID)}
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
                    {movie.Title}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        {/* Tercera sección: Series */}
        <Container className='mt-3 rounded-2 p-4' style={{ background: 'linear-gradient(-45deg, #3e454c 20%, #125c7a 80%)' }}>
          <div className='rounded-top-4' style={{ paddingLeft: '40px', background: '#144d66' }}>
            <h2 className='section-title'>Películas</h2>
          </div>
          <Row className='d-flex flex-wrap p-0'>
            {series.map((serie, index) => (
              <Col key={serie.imdbID} xs={6} md={4} lg={2} className='mb-4 '>
                <div
                  className='d-flex flex-column justify-content-end'
                  style={{
                    width: '100%',
                    height: '306px',
                    cursor: 'pointer',
                    backgroundImage: `url(${serie.Poster})`,
                    backgroundSize: 'cover',
                    border: '4px solid white',
                    borderRadius: '4px'
                  }}
                  onClick={() => handleCardClick(serie.imdbID)}
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
                    {serie.Title}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  )
}
