import Axios from 'axios';
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { API_URL } from "../config";

export default function CreateThread(props) {

    const handlePostCreate = (e) => {
        e.preventDefault();
        const {title, content} = e.target

        Axios.post(`${API_URL}/forums/new`, {
            title: title.value, 
            content: content.value,
            author: props.user._id,
        }, {withCredentials: true})
        .then((response) => {
            console.log(response.data);
            props.history.push("/forums");
        })

    }

    return (
        <div style={{textAlign: "center"}}>
        <h2 style={{marginBottom: 20, color: "#84d812"}}>Create a post</h2>
            <Form onSubmit={handlePostCreate}>
                <Form.Group>
                    <Form.Control size="lg" type="text" placeholder="Post title" name="title" />
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" rows={8} name="content" placeholder="Post content"/>
                </Form.Group>
                <Button type="submit" style={{backgroundColor: "#84d812", border:"1px solid #84d812", marginTop: 15}}>Post</Button>
            </Form>
        </div>
    )
}
