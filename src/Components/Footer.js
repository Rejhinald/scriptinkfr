import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer style={{ margin: '10%'}}>
    <Container>
      <Row>
        <Col className='text-center py-3'>Copyright &copy; ScriptInk</Col>
      </Row>
    </Container>
    </footer>
  )
}

export default Footer
