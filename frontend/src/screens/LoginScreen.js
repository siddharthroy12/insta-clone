import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    function submitHandler(e) {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={6}>
                    <Card style={{marginBottom: "40px"}}>
                        <Card.Body>
                            <h1 style={{textAlign: "center", marginBottom: "20px"}}>Login</h1>
                            {error && <Message variant='danger'>{error}</Message>}
                            {loading && <Loader />}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="username">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Button type="submit" disabled={loading}>Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <h5 style={{
                        textAlign: "center",
                        borderBottom: "1px solid",
                        lineHeight:"0",
                        marginBottom: "40px"}}>
                        <span style={{background: "white", padding: "10px"}}>Or</span>
                    </h5>
                    <Card>
                        <Card.Body>
                            <h5 style={{textAlign: "center"}}>
                                Don't have a account? <Link to='/register'>Sign Up</Link>
                            </h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
}

export default LoginScreen