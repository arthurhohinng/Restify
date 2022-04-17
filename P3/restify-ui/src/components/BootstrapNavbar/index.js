import React, { useEffect, useState } from "react";
import "./style.css";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Logout from "../FormPages/Logout";
import Form from "react-bootstrap/Form";

const BootstrapNavbar = () => {
    const [loggedIn, setLoggedIn] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token == null){
            setLoggedIn(false)
        }
    }, [])
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Restify</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {loggedIn ?
                        <>
                            <Nav.Link href="/feed">Feed</Nav.Link>
                            <Nav.Link href="/">My Restaurant</Nav.Link>
                            <NavDropdown title="Profile" id="basic-nav-dropdown" menuVariant="dark">
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/profile">Edit Profile</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Notifications" id="basic-nav-dropdown" menuVariant="dark">
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </>
                        :
                        <>
                        </>}
                    </Nav>
                    <Nav>
                        {loggedIn ? 
                        <Nav.Link href="/">
                            <Logout />
                        </Nav.Link>
                        :
                        <Nav.Link href="/login">
                            <div className="btn btn-outline-success my-2 my-sm-0 btn-block">Login</div>
                        </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default BootstrapNavbar;