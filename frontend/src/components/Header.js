import { useState } from 'react'
import { Navbar, Container, Nav, Image, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AiFillHome } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'
import { HiLogout } from 'react-icons/hi'

const Header = () => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    function toggleDropdown() {
        if (dropdownIsOpen) {
            setDropdownIsOpen(false)
        } else {
            setDropdownIsOpen(true)
        }
    }

    return (
        <Navbar bg="light">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>Instaclone</Navbar.Brand>
                </LinkContainer>
                <Nav>
                    <Nav.Link><AiFillHome /></Nav.Link>
                    <Nav.Link><FaUsers /></Nav.Link>
                    <Nav.Item>
                        <Image src="/uploads/default_profile.png" roundedCircle onClick={toggleDropdown} />
                        {dropdownIsOpen && (
                            <ListGroup>
                                <ListGroup.Item><CgProfile /> Profile</ListGroup.Item>
                                <ListGroup.Item><FiSettings /> Profile Settings</ListGroup.Item>
                                <ListGroup.Item><HiLogout /> Logout</ListGroup.Item>
                            </ListGroup>
                        )}
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header