import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history, location }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const redirect = '/'
    const userRegister = useSelector(state => state.userRegister)
    let { loading: registerLoading, error: registerError } = userRegister
    const userLogin = useSelector(state => state.userLogin)
    let { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    function submitHandler(e) {
        e.preventDefault()
        if (passwordRepeat === password) {
            dispatch(register(username, email, password))
        }
    }

    return (
        <Container className="loginContainer">
            <Row className="justify-content-center">
                <Col xs={12}>
                    <Card style={{marginBottom: "40px"}}>
                        <Card.Body>
                            <h1 style={{textAlign: "center", marginBottom: "20px"}}>Register</h1>
                            {passwordRepeat !== password &&
                                <Message variant='danger'>
                                    Password do not match
                                </Message>
                            }
                            {registerError && <Message variant='danger'>{registerError}</Message>}
                            {registerLoading && <Loader />}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="username">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}>
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
                                <Form.Group controlId="passwordRepeat">
                                    <Form.Control
                                        type="password"
                                        placeholder="Repeat Password"
                                        value={passwordRepeat}
                                        onChange={e => setPasswordRepeat(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    disabled={registerLoading || passwordRepeat !== password}>
                                        Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <h5
                        style={{
                            textAlign: "center",
                            borderBottom: "1px solid",
                            lineHeight:"0",
                            marginBottom: "40px"
                        }}>
                        <span style={{background: "white", padding: "10px"}}>Or</span>
                    </h5>
                    <Card>
                        <Card.Body>
                        <h5
                            style={{textAlign: "center"}}>
                            Already have a account? <Link to='/login'>Sign In</Link>
                        </h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
}

export default RegisterScreen