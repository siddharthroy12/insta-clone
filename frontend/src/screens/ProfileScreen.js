import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Card, Image, Tab, Tabs, Badge } from 'react-bootstrap'
import { getProfile } from '../actions/userActions'
import Loader from '../components/Loader'

const ProfileScreen = ({ history }) => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const { loading: profileLoading, error: profileError, userProfile: profile } = userProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (!profile) {
            dispatch(getProfile())
        }
    }, [history, userInfo, dispatch, profile])

    function editButtonHandler() {
        history.push('/editprofile')
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={9}>
                    <Card>
                        {profileLoading ? <Loader /> : profile && (
                            <Card.Body>
                                <Row style={{marginBottom: "20px"}}>
                                    <Col xs={2} style={{marginRight: "50px"}}>
                                        <Image src={profile.profilePic || "/uploads/default_profile.png"} rounded fluid />
                                    </Col>
                                    <Col>
                                        <Row style={{display: "flex", gap: "20px", marginBottom: "20px"}}>
                                            <h5>{profile.username}</h5> <Button variant="outline-secondary" size="sm" style={{fontWeight:"bold", color:"black"}} onClick={editButtonHandler}> Edit Profile </Button>
                                        </Row>
                                        <Row>
                                            <ul style={{display: "flex", gap: "10px", listStyle: "none", padding:0}}>
                                                <li>
                                                    <span style={{marginRight:"10px", fontWeight:"bold"}}>{profile.posts.length}</span> <Badge variant="dark">Posts</Badge>
                                                </li>
                                                <li>
                                                    <span style={{marginRight:"10px", fontWeight:"bold"}}>{profile.followers.length}</span> <Badge variant="dark">Followers</Badge>
                                                </li>
                                                <li>
                                                    <span style={{marginRight:"10px", fontWeight:"bold"}}>{profile.followings.length}</span> <Badge variant="dark">Followings</Badge>
                                                </li>
                                            </ul>
                                        </Row>
                                        <Row>
                                            <h5>{profile.bio}</h5>
                                        </Row>
                                        <Row>
                                            <a href={profile.website}>{profile.website}</a>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Tabs defaultActiveKey="Posts" id="profile-tab">
                                            <Tab eventKey="Posts" title="Posts">
                                                <p>Posts</p>
                                            </Tab>
                                            <Tab eventKey="Saved" title="Saved">
                                                <p>Saved</p>
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