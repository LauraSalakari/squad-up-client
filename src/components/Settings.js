import React from 'react'
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Settings() {
    return (
        <div>
            <h3>Settings</h3>
            <ListGroup variant="flush">
                <ListGroup.Item><Link to="/profile/edit">Edit profile</Link></ListGroup.Item>
                <ListGroup.Item><Link to="/profile/security">Change password</Link></ListGroup.Item>
            </ListGroup>
            {/* <div>
                <Link to="/profile/edit">Edit profile</Link>
                <hr />
                <Link to="/profile/security">Change password</Link>
            </div> */}
        </div>
    )
}
