import React, {useEffect} from 'react'
import { Form, Button } from "react-bootstrap"

export default function SignUpForm(props) {

    useEffect(() => {
        return props.onUnmount
    }, [])

    return (<div style={{textAlign: "center"}}>
        <h2 style={{marginBottom: 20, color: "#9800FF"}}>Sign Up</h2>
            <Form onSubmit={props.onSignUp} >
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
                <Button type="submit" style={{backgroundColor: "#9800FF", border:"1px solid #9800FF", marginTop: 15}}>
                    Signup
                </Button>
                {
                props.errorMessage ? (
                    <p style={{color: "red"}}>{props.errorMessage}</p>
                ) : null
            }
            </Form>
            </div>
    )
}
