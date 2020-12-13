import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Card, Image, Tab, Tabs, Badge } from 'react-bootstrap'
import { getProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import PostCard from '../components/PostCard'

const ProfileScreen = ({ match, history }) => {
    const [followed, setFollowed] = useState(false)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const { loading: profileLoading, userProfile: profile } = userProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (!profile) {
            if (match.params.id) {
                dispatch(getProfile(match.params.id))
            } else {
               dispatch(getProfile(userInfo._id))
            }
        }
        if (profile) {
            if (profile._id !== match.params.id && match.params.id) {
                dispatch(getProfile(match.params.id))
            }
            axios.get(`/api/users/${userInfo._id}`)
                .then(res => {
                    setFollowed(res.data.followings.includes(profile._id))
                })
                .catch(err => console.error(err))
        }
    }, [history, userInfo, dispatch, match.params.id, profile])

    function editButtonHandler() {
        history.push(`/updateprofile/${profile._id}`)
    }

    async function followButtonHandler() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/users/${profile._id}`, {}, config)
        setFollowed(!followed)
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={9}>
                    <Card>
                        {profileLoading ? <Loader /> : profile && (
                            <Card.Body>
                                <Row style={{marginBottom: "20px"}}>
                                    <Col xs={2} style={{marginRight: "20px"}}>
                                        <Image
                                            src={profile.profilePic || "/uploads/default_profile.png"}
                                            style={{width:"100px"}}
                                            rounded
                                            fluid
                                        />
                                    </Col>
                                    <Col>
                                        <Row style={{display: "flex", gap: "20px", padding:"20px"}}>
                                            <h5>@{profile.username}</h5>
                                            {(userInfo.isAdmin || userInfo._id === profile._id) &&
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    style={{fontWeight:"bold", color:"black"}}
                                                    onClick={editButtonHandler}>
                                                    Edit Profile
                                                </Button>
                                            }
                                        </Row>
                                        <Row>
                                            <ul
                                                style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                    listStyle: "none",
                                                    padding:"20px",
                                                    paddingBottom:0,
                                                    marginBottom:0
                                                }}>
                                                <li>
                                                    <span
                                                        style={{
                                                            marginRight:"10px",
                                                            fontWeight:"bold"
                                                        }}>
                                                        {profile.posts.length}</span>
                                                        <Badge variant="dark">Posts</Badge>
                                                </li>
                                                <li>
                                                    <span
                                                        style={{
                                                            marginRight:"10px",
                                                            fontWeight:"bold"
                                                        }}>
                                                        {profile.followers.length}</span>
                                                        <Badge variant="dark">Followers</Badge>
                                                </li>
                                                <li>
                                                    <span
                                                        style={{
                                                            marginRight:"10px",
                                                            fontWeight:"bold"
                                                        }}>
                                                        {profile.followings.length}</span>
                                                        <Badge variant="dark">Followings</Badge>
                                                </li>
                                            </ul>
                                        </Row>
                                        <Row style={{padding:"20px"}}>
                                            <Button
                                                variant="primary"
                                                onClick={followButtonHandler}
                                                style={{
                                                    borderRadius:"5px",
                                                    width:"auto",
                                                    height:"30px",
                                                    lineHeight:0
                                                }}> {!followed ? 'Follow' : 'Unfollow'} </Button>
                                        </Row>   
                                        <Row style={{paddingLeft:"20px"}}>
                                            <h5>{profile.bio}</h5>
                                        </Row>
                                        <Row style={{paddingLeft:"20px"}}>
                                            <a
                                                href={profile.website}
                                                target="_blank"
                                                rel="noreferrer">
                                                {profile.website}
                                            </a>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Tabs defaultActiveKey="Posts" id="profile-tab">
                                            <Tab eventKey="Posts" title="Posts">
                                                <br></br>
                                                {profile.posts.length === 0 ? <p>No Post</p> :
                                                profile.posts.map(post => {
                                                    return <PostCard id={post} key={post}/>
                                                })}
                                            </Tab>
                                            <Tab eventKey="Saved" title="Saved">
                                                <br></br>
                                                {profile.saved.length === 0 ? <p>No Saved Post</p> :
                                                profile.saved.map(post => {
                                                    return <PostCard id={post} key={post}/>
                                                })}
                                            </Tab>
                                        </Tabs>
                                    </Col>
                                </Row>
                            </Card.Body>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen