import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Card, Dropdown, Image } from 'react-bootstrap'
import { AiFillHeart, AiOutlineMenu } from 'react-icons/ai'
import Loader from './Loader'
import Message from './Message'

const CommentCard = ({ data, postId }) => {
    const [deleted, setDeleted] = useState(false)
    const [userDetail, setUserDetail] = useState(null)
    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(true)
    const [likeLoading, setLikeLoading] = useState(false)
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: profile } = userLogin

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization' : `Bearer ${profile.token}`
        }
    }

    useEffect(() => {
        async function fetchUserDetail() {
            setLoading(true)
            const user = await axios.get(`/api/users/${data.user}`)
            setUserDetail(user.data)
            setLoading(false)
        }
        if (!userDetail) {
            fetchUserDetail()
            setLiked(data.likes.includes(profile._id))
        }
    }, [userDetail, data, profile])

    async function likeButtonHandler() {
        setLikeLoading(true)
        await axios.post(`/api/posts/${postId}/comments/${data._id}`, {}, config)
        setLiked(!liked)
        if (!liked) {
            data.likes.push(profile._id)
        } else {
            data.likes.pop()
        }
        setLikeLoading(false)
    }

    async function deleteButtonHandler() {
        await axios.delete(`/api/posts/${postId}/comments/${data._id}`, config)
        setDeleted(true)
    }

    return (
        <Card>
            {loading ? <Loader /> : (
            <Card.Body>
                {deleted ? <Card.Text><Message variant="danger">Deleted</Message></Card.Text> : (
                <div>
                    <Card.Title style={{display:"flex", justifyContent: "space-between"}}>
                <Link to={`/profile/${userDetail._id}`} className="post-header">
                    <Image
                        src={userDetail.profilePic}
                        roundedCircle
                        style={{width: "50px", marginRight: "20px"}}
                    />
                    @{userDetail.username}
                </Link>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-black">
                        <AiOutlineMenu />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/${userDetail._id}`}>
                            View Profile
                        </Dropdown.Item>
                        {(profile.isAdmin || profile._id === data.user) &&
                            <Dropdown.Item onClick={deleteButtonHandler}>
                                Delete
                            </Dropdown.Item>
                        }
                    </Dropdown.Menu>
                </Dropdown>
                </Card.Title>
                <Card.Text>
                    <p style={{fontFamily: "sans-serif"}}>{data.body}</p>
                </Card.Text>
                <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                    {liked ? <Button
                        variant="danger"
                        className="like-comment"
                        onClick={likeButtonHandler}
                        disabled={likeLoading}>
                        <AiFillHeart />
                    </Button> :
                    <Button
                        variant="outline-danger"
                        className="like-comment"
                        onClick={likeButtonHandler}
                        disabled={likeLoading}>
                        <AiFillHeart />
                    </Button>}
                    {data.likes.length}
                </div>
                </div>
                )}    
            </Card.Body>
            )}
        </Card>
    )
}

export default CommentCard