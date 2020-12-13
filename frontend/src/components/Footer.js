import { Navbar, Container, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <Navbar sticky="bottom" className="footer">
            <Container>
                <Col>
                    <p> Made By <span></span>
                        <a href="https://siddharthroy.netlify.app/" target="_blank" rel="noreferrer">
                            Siddharth Roy
                        </a>
                    </p>
                </Col>
            </Container>
        </Navbar>
    )
}

export default Footer