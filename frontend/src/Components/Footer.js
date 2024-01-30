import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

function Footer() {
    return (
        <div>
            <footer>
                <Container>
                    <Row>
                        <Col className='text-center py-2'>Copyright &copy; TikiToko</Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
    }

export default Footer
