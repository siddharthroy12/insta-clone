import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Dropdown, Image } from 'react-bootstrap'
import { AiFillHeart, AiOutlineMenu } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import Loader from './Loader'
import Message from './Message'
import { likePost, deletePost } from '../actions/postActions'

const PostCard = (props) => {
    const { postData, id } = props
    const [deleted, setDeleted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState(postData ? postData : null)
    
    async function fetchPost(id) {
        const { data } = await axios.get(`/api/posts/${id}`)
        return data
    }
    if (id && !post) {
        fetchPost(id).then(p => setPost(p))
    }
    
    const [userDetail, setUserDetail] = useState(null)
    const likePostState = useSelector(state => state.likePost)
    const { loading: likeLoading } = likePostState
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: profile } = userLogin
    const [liked, setLiked] = useState(post ? post.likes.includes(profile._id) : false)
    
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchUserDetail() {
            setLoading(true)
            const { data } = await axios.get(`/api/users/${post.user}`)
            setUserDetail(data)
            setLoading(false)
        }
        if (!userDetail && post) {
            fetchUserDetail()
            setLiked(post.likes.includes(profile._id))
        }
    }, [userDetail, loading, post, profile._id])

    function likeButtonHandler() {
        dispatch(likePost(post._id))
        setLiked(!liked)
        if (!liked) {
            post.likes.push(profile._id)
        } else {
            post.likes.pop()
        }
    }

    function deleteButtonHandler() {
        dispatch(deletePost(post._id))
        setDeleted(true)
    }

    return (
        <Card>
            {loading ? <Loader /> : (
                <Card.Body>
                    {deleted ? <Card.Text><Message variant="danger">Deleted</Message></Card.Text> : (
                    <div>
                        <Card.Title style={{display:"flex", justifyContent: "space-between"}}>
                    <div>
                        <Image
                            src={userDetail.profilePic}
                            roundedCircle
                            style={{width: "50px", marginRight: "20px"}}
                        />
                        @{userDetail.username}
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-black">
                            <AiOutlineMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${userDetail._id}`}>
                                View Profile
                            </Dropdown.Item>
                            <Dropdown.Item>Save</Dropdown.Item>
                            {(profile.isAdmin || profile._id === post.user) &&
                                <Dropdown.Item onClick={deleteButtonHandler}>
                                    Delete
                                </Dropdown.Item>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    </Card.Title>
                    <Card.Text>
                        <p style={{fontFamily: "sans-serif"}}>{post.body}</p>
                    </Card.Text>
                    {post.image !== "" &&
                        <Card.Img
                            variant="bottom"
                            src={post.image}
                            style={{height:"400px", objectFit: "cover", marginBottom:"20px"}}
                        />
                    }
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
                        {post.likes.length}
                        <Button
                            variant="outline-danger"
                            className="like-comment">
                            <BiComment />
                        </Button>
                        {post.comments.length}
                    </div>
                    </div>
                    )}    
                </Card.Body>
            )}
        </Card>
    )
}

export default PostCard