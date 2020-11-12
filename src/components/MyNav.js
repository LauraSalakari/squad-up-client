import React from 'react'
import { Navbar, Nav, NavDropdown, ButtonGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function MyGuestNav(props) {

    let logoStyle = {
        height: 40,
        margin: 0,
        padding: 0
    }

    let profIcon = {
        height: 40,
        borderRadius: "50%"
    }

    let navItem = {
        paddingTop: 7,
        marginLeft: 20,
        textDecoration: "none"
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="/"><Navbar.Brand><img src="https://res.cloudinary.com/meetpup/image/upload/v1605203131/LogoMakr-0n1Mvj_sx78uw.png" style={logoStyle} /></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/squads" style={{...navItem, color: "#d81284"}}>Squads</Link>
                        <Link to="/forums" style={{...navItem, color: "#84d812"}}>Forums</Link>

                    </Nav>
                    <Nav>
                        <NavDropdown title={<img src={props.user.image || "https://res.cloudinary.com/meetpup/image/upload/v1604869142/prof-default-icon_ody7zu.png"} style={profIcon}/>}id="collasible-nav-dropdown dropdown-button-drop-left" as={ButtonGroup} drop="left">
                            <NavDropdown.Item><Link to={`/profile/${props.user._id}`} style={{textDecoration:"none", color:"#9800FF"}}>My Profile</Link> </NavDropdown.Item>
                            <NavDropdown.Item><Link to={"/chat"} style={{textDecoration:"none", color:"#9800FF"}}> Messages</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to={"/settings"} style={{textDecoration:"none", color:"#9800FF"}}>Settings</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={props.onLogout} style={{textDecoration:"none", color:"#9800FF"}}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
