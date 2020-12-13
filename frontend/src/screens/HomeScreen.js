import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap'
import { BsFillImageFill } from 'react-icons/bs'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader'
import { fetchFeed } from '../actions/feedAction'
import { createPost } from '../actions/postActions'
import UserCard from '../components/UserCard'

const HomeScreen = ({history}) => {
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const redirect = '/login'
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const feed = useSelector(state => state.feed)
    const { feed: posts, loading: feedLoading } = feed
    const [users, setUsers] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            history.push(redirect)
        }
        if (!feedLoading && !posts) {
            dispatch(fetchFeed())
        }
        if (!users) {
            fetchUsers()
        }
    }, [history, userInfo, redirect, dispatch, feedLoading, posts, users])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                'Content-Type': 'multipart/form-data'
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    async function fetchUsers() {
        const { data } = await axios.get('/api/users')
        setUsers(data)
    }

    function submitButtonHandler(e) {
        e.preventDefault()
        dispatch(createPost(body, image))
        setBody('')
        setImage('')
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={submitButtonHandler}>
                                <Form.Group controlId="body">
                                    <Form.Label>Post Something</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="How was your day?"
                                        value={body}
                                        onChange={e => setBody(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='image' className="file-input">
                                        <label htmlFor="image-file"><BsFillImageFill /></label>
                                        <Form.File
                                            id='image-file'
                                            onChange={uploadFileHandler}>
                                        </Form.File>
                                </Form.Group>
                                {uploading && <p>Uploading...</p>}
                                {image !== "" && <Image
                                    src={image}
                                    style={{height: "500px", marginBottom:"20px"}}
                                />}
                                <div className="post-buttons">
                                    <Button variant="primary"
                                        type="submit"
                                        disabled={body.trim() === ''}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                    {!posts ? <Loader /> : posts.map(post => (
                        <PostCard postData={post} key={post._id}/>
                    ))}
                </Col>
                <Col xs={4} className="extras">
                    <h3>Admins</h3>
                    {users ? (
                        users.map(user => {
                            if (user.isAdmin) {
                                return <UserCard user={user} key={user._id}/>
                            }
                            return null
                        })
                    ) : <Loader /> }
                    <h3>All Users</h3>
                    {users ? (
                        users.map(user => <UserCard user={user} key={user._id}/>)
                    ) : <Loader /> }
                </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen