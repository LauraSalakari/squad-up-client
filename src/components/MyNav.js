import React from 'react'
import { Navbar, Nav, NavDropdown, ButtonGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function MyGuestNav(props) {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="/"><Navbar.Brand>SquadUp!</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/squads">Squads</Link>
                        <Link to="/forums">Forums</Link>

                    </Nav>
                    <Nav>
                        <NavDropdown title="Profile" id="collasible-nav-dropdown dropdown-button-drop-left" as={ButtonGroup} drop="left">
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                            <NavDropdown.Item>Messages</NavDropdown.Item>
                            <NavDropdown.Item><Link to="/profile/edit">Edit Prof</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={props.onLogout}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
