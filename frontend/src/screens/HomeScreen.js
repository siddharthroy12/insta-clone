import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { BsFillImageFill } from 'react-icons/bs'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader'
import { fetchFeed } from '../actions/feedAction'


const HomeScreen = ({history}) => {
    const redirect = '/login'
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const feed = useSelector(state => state.feed)
    const { feed: posts, loading: feedLoading } = feed
    console.log(posts)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            history.push(redirect)
        }
        if (!feedLoading && !posts) {
            dispatch(fetchFeed())
        }
    }, [history, userInfo, redirect, dispatch, feedLoading, posts])

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
                    {!posts ? <Loader /> : posts.map(post => (
                        <PostCard post={post} key={post._id}/>
                    ))}
                </Col>
                <Col xs={4}>
                    <p>Other Suffs</p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen