import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Button, Form} from "react-bootstrap"
import Axios from 'axios';
import { API_URL } from "../config";
import moment from 'moment';

export default function PostDetails(props) {

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        Axios.get(`${API_URL}/forums/${props.match.params.id}`, {withCredentials: true})
        .then((response) => {
            setPost(response.data);

            Axios.get(`${API_URL}/forums/${props.match.params.id}/comments`, {withCredentials: true})
            .then((comments) => {
                setComments(comments.data);
            })
            .catch((err) => {
                console.log("this is error:", err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const handleAddComment = (e) => {
        e.preventDefault();
        let {content} = e.target

        Axios.post(`${API_URL}/forums/${props.match.params.id}/comment`,{
            author: props.user._id,
            content: content.value
        } , {withCredentials: true})
        .then((response) => {
            console.log(response.data);
            response.data.author = props.user
            setComments([...comments, response.data])
            e.target.content.value = "";
        })
    }

    const handlePostDelete = () => {
        Axios.delete(`${API_URL}/forums/${props.match.params.id}/delete`, {withCredentials: true})
        .then(() => {
            props.history.push("/forums")
        })
    }
 
    if(!post) return null;
    else{
        return (
            <div style={{textAlign: "center"}}>
                <h3 style={{color: "#84d812"}}>{post.title}</h3>
                <p>Author: <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link> </p>
                <div className="postContentDiv">
                    {post.content}
                </div>
                {moment(post.createdAt).format("LLL")} <br/>
                {
                    (props.user._id === post.author._id) ? (
                        <div>
                        <Link to={`/forums/${props.match.params.id}/edit`}><Button variant="outline-primary" style={{margin: 10}}>Edit</Button></Link>
                        <Button onClick={handlePostDelete} variant="outline-danger" style={{margin: 10}}>Delete</Button>
                        </div>
                    ) : null
                }
                <Form onSubmit={handleAddComment}>
                    <Form.Control as="textarea" rows={3} name="content" />
                    <Button type="submit" variant="secondary" block style={{marginBottom: 20}}>Comment</Button>
                </Form>
                {
                    (!comments) ? (null) : ( <div>
                    {
                        comments.map((elem) => {
                           return <div key={elem._id} style={{border: "1px #84d812 solid", padding: 5, margin: 10,}}>
                                <Link to={`/profile/${elem.author._id}`}><b>{elem.author.username}</b></Link>
                                <p>{elem.content}</p>
                                {moment(elem.createdAt).format("LLL")}
                            </div>
                        })
                    }
                </div>)
                }
               
            </div>
        )
    }

    
}
