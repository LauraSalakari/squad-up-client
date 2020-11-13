import React, {useEffect} from 'react'
import { Form, Button } from "react-bootstrap"


export default function SignIn(props) {

    useEffect(() => {
        return props.onUnmount
    }, [])

    return (<div style={{textAlign: "center"}}>
    <h2 style={{marginBottom: 20, color: "#9800FF"}}>Sign In</h2>
            <Form onSubmit={props.onSignIn}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>
                <Button type="submit" style={{backgroundColor: "#9800FF", border:"1px solid #9800FF", marginTop: 15}}>
                    Sign In
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