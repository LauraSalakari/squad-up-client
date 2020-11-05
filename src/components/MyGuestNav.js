import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function MyNav() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="/"><Navbar.Brand>SquadUp!</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Link to="/signup">
                            Sign Up
                        </Link>
                        <Link to="signin">
                            Sign In
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
