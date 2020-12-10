import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Dropdown, Image } from 'react-bootstrap'
import { AiFillHeart, AiOutlineMenu } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import Loader from '../components/Loader'
import { likePost } from '../actions/postActions'

const PostCard = (props) => {
    const { postData, id } = props
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
    const { loading: likeLoading, error: likeError, success: likeSuccess } = likePostState
    const userLogin = useSelector(state => state.userLogin)
    const { loading: profileLoading, error: profileError, userInfo: profile } = userLogin
    const [liked, setLiked] = useState(post ? post.likes.includes(profile._id) : false)
    
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchUserDetail() {
            setLoading(true)
            const { data } = await axios.get(`/api/users/${post.user}`)
            console.log(data)
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

    return (
        <Card>
            {loading ? <Loader /> : (
                <Card.Body>
                <Card.Title style={{display:"flex", justifyContent: "space-between"}}>
                    <div>
                        <Image src="/uploads/default_profile.png" roundedCircle style={{width: "50px", marginRight: "20px"}} />
                        @{userDetail.username}
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-black">
                            <AiOutlineMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Follow</Dropdown.Item>
                            <Dropdown.Item>Save</Dropdown.Item>
                            <Dropdown.Item as={Link} to={`/profile/${userDetail._id}`}>View Profile</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Title>
                <Card.Text>
                    <p style={{fontFamily: "sans-serif"}}>{post.body}</p>
                </Card.Text>
                {post.image !== "" &&
                    <Card.Img variant="bottom" src="https://pbs.twimg.com/media/Eo1jSpkVEAAwLqV?format=jpg&name=360x360" style={{height:"400px", objectFit: "cover", marginBottom:"20px"}}/>
                }
                <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                        {liked ? <Button variant="danger" className="like-comment" onClick={likeButtonHandler} disabled={likeLoading}><AiFillHeart /></Button> :
                        <Button variant="outline-danger" className="like-comment" onClick={likeButtonHandler} disabled={likeLoading}><AiFillHeart /></Button>}
                        {post.likes.length}
                        <Button variant="outline-danger" className="like-comment"><BiComment /></Button>
                        {post.comments.length}
                </div>    
                </Card.Body>
            )}
        </Card>
    )
}

export default PostCard