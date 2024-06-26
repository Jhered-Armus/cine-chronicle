import React from 'react'
import { Spinner } from 'react-bootstrap'

export function LoadingComponent () {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <Spinner animation='grow' role='status'>
        <span className='sr-only text-light'>Cargando...</span>
      </Spinner>
    </div>
  )
};

export default LoadingComponent
