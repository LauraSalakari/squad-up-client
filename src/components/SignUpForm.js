import React, {useEffect} from 'react'
import { Form, Button } from "react-bootstrap"

export default function SignUpForm(props) {

    useEffect(() => {
        return props.onUnmount
    }, [])

    return (
            <Form onSubmit={props.onSignUp}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" />
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
