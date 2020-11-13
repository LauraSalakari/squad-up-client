import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function MyGuestNav() {

    let logoStyle = {
        height: 40,
        margin: 0,
        padding: 0
    }
    
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="/"><Navbar.Brand><img src="https://res.cloudinary.com/meetpup/image/upload/v1605203131/LogoMakr-0n1Mvj_sx78uw.png" style={logoStyle} /></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Link to="/signup" style={{textDecoration:"none", color:"#9800FF", margin: 10}}>
                            Sign Up
                        </Link>
                        <Link to="/signin" style={{textDecoration:"none", color:"#9800FF", margin: 10}}>
                            Sign In
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
