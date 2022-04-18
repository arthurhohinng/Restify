import React, { useEffect, useState } from "react";
import "./style.css";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Logout from "../FormPages/Logout";
import Notification from "../Notification";
import API from "../API";

const GetOwnedId = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [checkId, setCheckId] = useState(0)

    useEffect(() => {
        fetch(`${API}/accounts/restaurant/`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(response => { return response.json()})
            .then(response => setCheckId(response))
            .catch(err => {
                console.log("error: " + err)
        })
    }, [token])
    return checkId[0]
}

const BootstrapNavbar = () => {
    const [loggedIn, setLoggedIn] = useState(true)
    let ownedId = GetOwnedId()

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        if (token == null){
            setLoggedIn(false)
        }
    }, [])

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/"><img src={require("../../assets/restify.png")} alt="Restify" width="150px"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {loggedIn ?
                        <>
                            <Nav.Link href="/feed">Feed</Nav.Link>
                            {ownedId === undefined ?
                                <Nav.Link href="restaurant/add-restaurant/">
                                    My Restaurant
                                </Nav.Link>
                                :
                                <Nav.Link href={`/restaurant/${ownedId}`}>
                                    My Restaurant
                                </Nav.Link>
                            }
                            <NavDropdown title="Profile" id="basic-nav-dropdown" menuVariant="dark">
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/profile/edit">Edit Profile</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Notifications" id="basic-nav-dropdown" menuVariant="dark">
                                <Notification />
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
                            <div className="btn btn-success my-2 my-sm-0 btn-block">Login</div>
                        </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default BootstrapNavbar;