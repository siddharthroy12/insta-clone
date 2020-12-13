import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image} from 'react-bootstrap'

const UserCard = ({ user }) => {
    const [followed, setFollowed] = useState(false)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (user.followers.includes(userInfo._id)) {
            setFollowed(true)
        }
    }, [user.followers, userInfo._id])

    async function followButtonHandler() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/users/${user._id}`, {}, config)
        setFollowed(!followed)
    }

    return (
        <Card style={{marginBottom:"20px"}}>
            <Card.Body style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                <Link style={{
                        display:"flex",
                        alignItems:"center"
                    }} className="post-header" to={`/profile/${user._id}`}>
                    <Image
                        src={user.profilePic}
                        style={{width: "30px", marginRight: "20px"}}
                    />
                    <h5>@{user.username}</h5>
                </Link>
                <div>
                    <p onClick={followButtonHandler}
                        style={{
                            fontFamily: "sans-serif",
                            margin: 0,
                            cursor: "pointer"
                        }}>
                        { followed ? 'Unfollow' : 'Follow' }
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default UserCard