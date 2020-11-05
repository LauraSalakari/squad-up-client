import React, {useEffect} from 'react'
import { Form, Button } from "react-bootstrap"


export default function SignIn(props) {

    useEffect(() => {
        return props.onUnmount
    }, [])

    return (
            <Form onSubmit={props.onSignIn}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Signup
                </Button>
                {
                props.errorMessage ? (
                    <p style={{color: "red"}}>{props.errorMessage}</p>
                ) : null
            }
            </Form>
    )
}