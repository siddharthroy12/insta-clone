import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserCard from '../components/UserCard'
import Loader from '../components/Loader'

const UserScreen = () => {
    const [users, setUsers] = useState(null)

    async function fetchUsers() {
        const { data } = await axios.get('/api/users')
        setUsers(data)
    }

    useEffect(() => {
        if (!users) {
            fetchUsers()
        }
    })

    console.log(users)

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={6}>
                    <h2 style={{textAlign:"center"}}>Users</h2>
                    {users ? (
                        users.map(user => <UserCard user={user} key={user._id}/>)
                    ) : <Loader /> }
                </Col>
            </Row>
        </Container>
    )
}

export default UserScreen