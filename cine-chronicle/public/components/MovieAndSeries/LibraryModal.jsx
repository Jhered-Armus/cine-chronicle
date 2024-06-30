import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import env from '../../utils/configEnv'

export function LibraryModal ({ show, handleClose, userId, itemId }) {
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (show) {
      // Fetch the library entry for the given userId and itemId
      const fetchLibraryEntry = async () => {
        try {
          const response = await axios.get(`${env.backendUrl}/api/library/${userId}`)
          const library = response.data
          const entry = library.entries.find(entry => entry.itemId === itemId)
          if (entry) {
            setStatus(entry.status)
          } else {
            setStatus('')
          }
        } catch (error) {
          console.error('Error fetching library entry:', error)
        }
      }

      fetchLibraryEntry()
    }
  }, [show, userId, itemId])

  const handleSave = async () => {
    try {
      const response = await axios.post(`${env.backendUrl}/api/library`, {
        userId,
        itemId,
        status
      })
      console.log('Library status updated:', response.data)
      handleClose()
    } catch (error) {
      console.error('Error updating library status:', error)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir a Mi Biblioteca</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formLibraryStatus'>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as='select'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value=''>Seleccionar</option>
              <option value='Favorito'>Favorito</option>
              <option value='Viendo'>Viendo</option>
              <option value='En Espera'>En Espera</option>
              <option value='Abandonado'>Abandonado</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant='primary' onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default LibraryModal
