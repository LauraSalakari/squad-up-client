import React from 'react'
import {Form, Button} from "react-bootstrap"

export default function Security(props) {
    return (
        <div style={{textAlign: "center"}}>
        <h3>Security settings</h3>
        <h5>Account details:</h5>
        <p>
            <b>Username: </b> {props.user.username}
            <br/>
            <b>Account email: </b> {props.user.email}
        </p>

        <h5>Change password</h5>
        <Form onSubmit={props.onChangePassword}>
            <Form.Group>
                <Form.Label>Old password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" name="password" />
            </Form.Group>
            <Form.Group>
                <Form.Label>New password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" name="newPassword" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control type="password" placeholder="Confirm new password" name="confirmPassword" />
            </Form.Group>
            <Button type="submit" style={{backgroundColor: "#9800FF", border:"1px solid #9800FF", marginTop: 15}}>Edit</Button>
        </Form>
        </div>
    )
}
