import Axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Form, Button} from "react-bootstrap"
import { API_URL } from "../config";

export default function EditPost(props) {

    const [post, setPost] = useState(null);

    useEffect(() => {
        Axios.get(`${API_URL}/forums/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {
                setPost(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handlePostEdit = (e) => {
        e.preventDefault();
        const { title, content } = e.target

        Axios.patch(`${API_URL}/forums/${props.match.params.id}/edit`, {
            title: title.value,
            content: content.value,
        }, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                props.history.push(`/forums/${props.match.params.id}`);
            })
    }

    if (!post) return null;
    else {
        return (
            <div style={{textAlign: "center"}}>
                <h2 style={{marginBottom: 20, color: "#84d812"}}>Edit your post</h2>
                <Form onSubmit={handlePostEdit}>
                    <Form.Group>
                        <Form.Control size="lg" type="text" placeholder="Post title" name="title" defaultValue={post.title} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={8} name="content" defaultValue={post.content} />
                    </Form.Group>
                    <Button type="submit" style={{backgroundColor: "#84d812", border:"1px solid #84d812", marginTop: 15}}>Post</Button>
                </Form>
            </div>
        )
    }

}
