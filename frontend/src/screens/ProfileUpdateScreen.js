import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Form, Button, Row, Col, Card, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { getProfile } from '../actions/userActions'

const ProfileUpdateScreen = ({ history, location, match }) => {
    const [username, setUsername] = useState('Loading')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [website, setWebsite] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [profilePic, setProfilePic] = useState('')

    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const redirect = '/login'
    const userLogin = useSelector(state => state.userLogin)
    let { userInfo } = userLogin

    const userProfile = useSelector(state => state.userProfile)
    const { loading: profileLoading, error: profileError, userProfile: profile } = userProfile

    useEffect(() => {
        if (!userInfo) {
            history.push(redirect)
        }
        if (match.params.id !== userInfo._id && (!userInfo.isAdmin)) {
            history.push(redirect)
        }
        if (!profile) {
            if (match.params.id) {
                dispatch(getProfile(match.params.id))
            } else {
               dispatch(getProfile())
            }
        }
        if (profile) {
            if (profile._id !== match.params.id) {
                dispatch(getProfile(match.params.id))
            }
            setUsername(profile.username)
            setEmail(profile.email)
            setBio(profile.bio)
            setWebsite(profile.website)
            setIsAdmin(profile.isAdmin)
            setProfilePic(profile.profilePic)
        }
    }, [history, userInfo, redirect, dispatch, match.params.id, profile])

    function submitHandler(e) {
        e.preventDefault()
        if (passwordRepeat === password) {
            dispatch(register(username, email, password))
        }
    }

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
            setProfilePic(data)
            setUploading(false)
        
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                    <Card style={{marginBottom: "40px"}}>
                        <Card.Body>
                            <h1 style={{textAlign: "center", marginBottom: "20px"}}>Update Profile Settings</h1>
                            <h5 style={{textAlign: "center", marginBottom: "20px"}}>{username}</h5>
                            <Image
                                src={profilePic || "/uploads/default_profile.png"}
                                rounded
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    display: "block",
                                    width: "100px"
                                }}
                            />
                            {passwordRepeat !== password && <Message variant='danger'>Password do not match</Message>}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='image' className="file-input">
                                    <label
                                        htmlFor="image-file"
                                        style={{
                                            textAlign:"center",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            display: "block"
                                        }}>
                                        Change Profile Pic
                                    </label>
                                    <Form.File
                                        id='image-file'
                                            onChange={uploadFileHandler}>
                                    </Form.File>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="bio">
                                    <Form.Control
                                        type="text"
                                        placeholder="Bio"
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="website">
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Website"
                                        value={website}
                                        onChange={e => setWebsite(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                {userInfo.isAdmin && 
                                    (
                                        <>
                                            <Form.Group controlId="isAdmin">
                                                <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={e => setIsAdmin(!isAdmin)}></Form.Check>
                                            </Form.Group>
                                        </>
                                    )
                                }
                                {profile && (!userInfo.isAdmin || userInfo._id === profile._id) &&
                                    (
                                        <>
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
                                        </>
                                    )
                                }
                                <Button type="submit" disabled={passwordRepeat !== password}>Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
            </Row>
        </Container>
    )
}

export default ProfileUpdateScreen