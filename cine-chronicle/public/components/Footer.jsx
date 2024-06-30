import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export function Footer () {
  return (
    <footer style={{ background: '#0e3143' }} className='text-white mt-5 p-4 text-center'>
      <Container>
        <Row>
          <Col>
            <p>
              {new Date().getFullYear()} Movie Catalog. Built with{' '}
              <a href='https://reactjs.org/' target='_blank' rel='noreferrer'>
                React
              </a>{' '}
              and{' '}
              <a href='https://getbootstrap.com/' target='_blank' rel='noreferrer'>
                Bootstrap
              </a>
              . Data provided by{' '}
              <a href='https://www.omdbapi.com/' target='_blank' rel='noreferrer'>
                OMDB API
              </a>
              . See the code on {' '}
              <a href='https://github.com/Jhered-Armus/cine-chronicle' target='_blank' rel='noreferrer'>
                GitHub
              </a>
              .
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
