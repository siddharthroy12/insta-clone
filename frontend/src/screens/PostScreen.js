import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Col, Form, Button } from 'react-bootstrap'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader'
import CommentCard from '../components/CommentCard'

const PostScreen = ({ match }) => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const fetchPost = async (id) => {
        const { data } = await axios.get(`/api/posts/${id}`)
        setPost(data)
        data.comments.reverse()
        setComments(data.comments)
    }

    useEffect(() => {
        if (!post) {
            fetchPost(match.params.id)
        }
    }, [post,match.params.id])

    async function submitButtonHandler(e) {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.post(`/api/posts/${post._id}/comments`, {
            body: comment
        }, config)
        data.comments.reverse()
        setComments(data.comments)
        setComment('')
    }

    return (
        <Container>
            {post ? (
                <>
                <Col style={{marginBottom:"20px"}}>
                <PostCard postData={post} />
                </Col>
                <Col>
                <Form onSubmit={submitButtonHandler}>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="comment">
                                <Form.Control
                                    type="text"
                                    placeholder="Create a comment..."
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" disabled={comment.trim() === ""}>
                                Comment
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
                </Col>
                <Col>
                    {
                        comments.map(
                            comment => <CommentCard 
                                data={comment}
                                postId={post._id}
                                key={comment._id}
                            />
                        )
                    }
                </Col>
                </>
            ) : <Loader /> }
            
        </Container>
    )
}

export default PostScreen