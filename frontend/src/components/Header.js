import { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Image, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { AiFillHome } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'
import { HiLogout } from 'react-icons/hi'
import { logout } from '../actions/userActions'

const Header = () => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            setShowMenu(false)
        } else {
            setShowMenu(true)
        }
    }, [userInfo, setShowMenu])

    function toggleDropdown() {
        if (dropdownIsOpen) {
            setDropdownIsOpen(false)
        } else {
            setDropdownIsOpen(true)
        }
    }

    function logoutHandler() {
        dispatch(logout())
        window.location.reload()
    }

    return (
        <Navbar bg="light" fixed="top">
            <Container>
                <LinkContainer to='/' onClick={e => setDropdownIsOpen(false)}>
                    <Navbar.Brand>Instaclone</Navbar.Brand>
                </LinkContainer>
                {showMenu && (
                    <Nav>
                    <LinkContainer to='/' onClick={e => setDropdownIsOpen(false)}>
                        <Nav.Link><AiFillHome /></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/peoples' onClick={e => setDropdownIsOpen(false)}>
                        <Nav.Link><FaUsers /></Nav.Link>
                    </LinkContainer>
                    <Nav.Item>
                        <Image
                            src={
                                userInfo ? userInfo.profilePic : '/img/default_profile.png'
                            }
                            roundedCircle
                            onClick={toggleDropdown}
                        />
                        {dropdownIsOpen && (
                            <ListGroup onClick={e => setDropdownIsOpen(false)}>
                                <LinkContainer to={`/profile/${userInfo._id}`}>
                                    <ListGroup.Item>
                                        <CgProfile /> Profile
                                    </ListGroup.Item>
                                </LinkContainer>
                                <LinkContainer to={`/updateprofile/${userInfo._id}`}>
                                    <ListGroup.Item>
                                        <FiSettings /> Profile Settings
                                    </ListGroup.Item>
                                </LinkContainer>
                                <ListGroup.Item onClick={logoutHandler}>
                                    <HiLogout /> Logout
                                </ListGroup.Item>
                            </ListGroup>
                        )}
                    </Nav.Item>
                    </Nav>
                )}
            </Container>
        </Navbar>
    )
}

export default Header