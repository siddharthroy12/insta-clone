import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { BsFillImageFill } from 'react-icons/bs'

const HomeScreen = () => {

    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="body">
                                    <Form.Label>Post Something</Form.Label>
                                    <Form.Control type="text" placeholder="How was your day?" />
                                </Form.Group>
                                <Form.Group controlId='image' className="file-input">
                                        <label htmlFor="image-file"><BsFillImageFill /></label>
                                        <Form.File
                                            id='image-file'>
                                        </Form.File>
                                </Form.Group>
                                <div className="post-buttons">
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={4}>
                    <p>Other Suffs</p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen