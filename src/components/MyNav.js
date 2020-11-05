import React from 'react'
import { Navbar, Nav, NavDropdown, ButtonGroup } from "react-bootstrap";

export default function MyGuestNav() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>SquadUp!</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>Squads</Nav.Link>
                        <Nav.Link>Forums</Nav.Link>

                    </Nav>
                    <Nav>
                        <NavDropdown title="Profile" id="collasible-nav-dropdown dropdown-button-drop-left" as={ButtonGroup} drop="left">
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                            <NavDropdown.Item>Messages</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
