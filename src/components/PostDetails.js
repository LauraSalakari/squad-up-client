import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Button, Form} from "react-bootstrap"
import Axios from 'axios';
import { API_URL } from "../config";
import moment from 'moment';

export default function PostDetails(props) {

    const [post, setPost] = useState(null)

    useEffect(() => {
        Axios.get(`${API_URL}/forums/${props.match.params.id}`, {withCredentials: true})
        .then((response) => {
            setPost(response.data);
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const handleAddComment = (e) => {
        e.preventDefault();
        console.log(e.target);
    }
 
    if(!post) return null;
    else{
        return (
            <div>
                <h3>{post.title}</h3>
                <p>Author: <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link> </p>
                <div style={{border: "1px #e7e0ec solid", padding: 5, margin: 10,}}>
                    {post.content}
                </div>
                {
                    (props.user._id === post.author._id) ? (
                        <Button>Edit</Button>
                    ) : null
                }
                <Form onSubmit={handleAddComment}>
                    <Form.Control as="textarea" rows={3} name="content" />
                    <Button type="submit" variant="secondary">Comment</Button>
                </Form>
            </div>
        )
    }

    
}
