import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Button, Form} from "react-bootstrap"
import Axios from 'axios';
import { API_URL } from "../config";
import moment from 'moment';

export default function Forums(props) {

    const [threads, setThreads] = useState(null);
    const [filtered, setFiltered] = useState(null);

    useEffect(() => {
        Axios.get(`${API_URL}/forums`, {withCredentials: true})
        .then((response) => {
            setThreads(response.data);
            setFiltered(response.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleThreadSearch = (e) => {
        let search = e.target.value;
        let filteredPosts = threads.filter((elem) => {
            return (elem.title.toLowerCase().includes(search.toLowerCase()) || elem.content.toLowerCase().includes(search.toLowerCase()))
        })
        setFiltered(filteredPosts);
    }

    if(!filtered)return null;
    else{
        return (
            <div>
                <Link to={"/forums/new"}><Button variant="primary" size="lg" block>Create a Post</Button></Link>
                <Form.Control type="text" placeholder="Search posts" name="threadSearch" onChange={handleThreadSearch} />
                <div>
                    {
                        filtered.map((elem) => {
                            return <Link to={`/forums/${elem._id}`}>
                                <div style={{ border: "1px #e7e0ec solid", padding: 5, margin: 10, textDecoration: "none", color: "#e7e0ec" }}>
                                    <h4>{elem.title}</h4>
                                    <p>Author: <Link to={`/profile/${elem.author._id}`}>{elem.author.username}</Link> </p>
                                    {moment(elem.createdAt).format("LLL")}
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        )
    }
}
