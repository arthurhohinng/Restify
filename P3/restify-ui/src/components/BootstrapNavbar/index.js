import React, { useEffect, useState } from "react";
import "./style.css";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Logout from "../FormPages/Logout";

const BootstrapNavbar = () => {
    const [loggedIn, setLoggedIn] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token == null){
            setLoggedIn(false)
        }
    }, [])
    
    return (
        <Navbar bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand href="/">Restify</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {loggedIn ?
                    <>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown" menuVariant="dark">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <Logout />
                    </>
                    :
                    <>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </>}
                </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default BootstrapNavbar;