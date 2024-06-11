import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

export function ReviewModal ({ show, handleClose, title, username, userId, itemId, episode, reviewData }) {
  const initialReviewState = {
    summary: '',
    rating: '',
    seen: false,
    reviewDate: '',
    themes: '',
    conclusion: ''
  }

  const [review, setReview] = useState(initialReviewState)
  const [error, setError] = useState('')
  const [noReviewFound, setNoReviewFound] = useState(false)

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${userId}/${itemId}/${episode}`)
        const reviewData = response.data
        console.log('Fetched review:', reviewData)

        if (reviewData) {
          setReview({
            summary: reviewData.summary || '',
            rating: reviewData.rating || '',
            seen: reviewData.seen || false,
            reviewDate: reviewData.reviewDate ? reviewData.reviewDate.split('T')[0] : '',
            themes: reviewData.themes || '',
            conclusion: reviewData.conclusion || ''
          })
          setNoReviewFound(false)
        } else {
          resetForm()
          setNoReviewFound(true)
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Reseña no encontrada
          setNoReviewFound(true)
        } else {
          // Otro tipo de error
          console.error('Error fetching review:', error)
          setError('Error al obtener la reseña. Por favor, inténtalo de nuevo.')
        }
      }
    }

    if (show) {
      fetchReview()
    }
  }, [show, userId, itemId, episode])

  const handleSaveReview = async () => {
    try {
      const reviewData = {
        userId,
        username,
        itemId,
        episode,
        ...review
      }

      await axios.post('http://localhost:5000/api/reviews', reviewData)
      resetForm()
      handleClose()
    } catch (error) {
      console.error('Error saving review:', error)
      setError('Error al guardar la reseña. Por favor, inténtalo de nuevo.')
    }
  }

  const handleAlertClose = () => {
    setError('')
    setNoReviewFound(false)
  }

  const resetForm = () => {
    setReview(initialReviewState)
  }

  const handleCancel = () => {
    resetForm()
    handleClose()
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setReview({ ...review, [name]: newValue })
  }

  const handleAlerClose = () => {
    handleClose()
    resetForm()
  }

  return (
    <Modal show={show} onHide={handleAlerClose} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Reseña para {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formReviewSummary'>
            <Form.Label>Resumen del capítulo o película</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='summary'
              value={review.summary}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formRating'>
            <Form.Label>Calificación</Form.Label>
            <Form.Control
              type='number'
              min='0'
              max='10'
              step='0.1'
              name='rating'
              value={review.rating}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formSeen'>
            <Form.Check
              type='checkbox'
              label='Visto'
              name='seen'
              checked={review.seen}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formReviewDate'>
            <Form.Label>Fecha de reseña</Form.Label>
            <Form.Control
              type='date'
              name='reviewDate'
              value={review.reviewDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formThemes'>
            <Form.Label>Temas y mensajes</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='themes'
              value={review.themes}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formConclusion'>
            <Form.Label>Conclusión</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='conclusion'
              value={review.conclusion}
              onChange={handleInputChange}
            />
          </Form.Group>
          {error && (
            <Alert variant='danger' onClose={handleAlertClose} dismissible>
              {error}
            </Alert>
          )}
          {noReviewFound && !error && (
            <Alert variant='info' onClose={handleAlertClose} dismissible>
              Aún no has creado una reseña para este capítulo.
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant='primary' onClick={handleSaveReview}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  )
};
export default ReviewModal
