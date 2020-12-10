import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Dropdown, Image } from 'react-bootstrap'
import { AiFillHeart, AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import Loader from '../components/Loader'
import { likePost } from '../actions/postActions'

const PostCard = (props) => {
    const { post } = props
    const [loading, setLoading] = useState(true)
    const [userDetail, setUserDetail] = useState(null)
    const likePostState = useSelector(state => state.likePost)
    const { loading: likeLoading, error: likeError, success: likeSuccess } = likePostState
    const userLogin = useSelector(state => state.userLogin)
    const { loading: profileLoading, error: profileError, userInfo: profile } = userLogin
    const [liked, setLiked] = useState(post.likes.includes(profile._id))
    
    const dispatch = useDispatch()

    async function fetchUserDetail() {
        setLoading(true)
        const { data } = await axios.get(`/api/users/${post.user}`)
        console.log(data)
        setUserDetail(data)
        setLoading(false)
    }

    useEffect(() => {
        if (!userDetail) {
            fetchUserDetail()
        }
    }, [userDetail, fetchUserDetail, loading])

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
                            <Dropdown.Item href="#/action-1">Follow</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Save</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">View Profile</Dropdown.Item>
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