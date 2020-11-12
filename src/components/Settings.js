import React from 'react'
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Settings() {
    return (
        <div className="settings-div">
            <h3>Settings</h3>
            <ListGroup variant="flush" style={{backgroundColor:"blue"}}>
            <Link to="/profile/edit" style={{textDecoration:"none"}} ><ListGroup.Item action variant="dark">Edit profile</ListGroup.Item></Link>
            <Link to="/profile/security" style={{textDecoration:"none"}}><ListGroup.Item action variant="dark">Change password</ListGroup.Item></Link>
            </ListGroup>
            {/* <div>
                <Link to="/profile/edit">Edit profile</Link>
                <hr />
                <Link to="/profile/security">Change password</Link>
            </div> */}
        </div>
    )
}
