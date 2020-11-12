import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import Axios from 'axios';
import { API_URL } from "../config";
import moment from 'moment';

export default function Forums(props) {

    const [threads, setThreads] = useState(null);
    const [filtered, setFiltered] = useState(null);

    useEffect(() => {
        Axios.get(`${API_URL}/forums`, { withCredentials: true })
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

    if (!filtered) return null;
    else {
        return (
            <div className="forums-main">
                <h2>Forums</h2>
                    <div className="squads-utilities">
                        <Link to={"/forums/new"}>
                            <Button style={{ color: "#84d812", border: "1px solid #84d812", marginBottom: 10 }} variant="outline" block>Create a Post</Button>
                        </Link>
                        <Form.Control type="text" placeholder="Search posts" name="threadSearch" onChange={handleThreadSearch} />
                    </div>
                    <div className="squad-div-container">
                        {
                            threads ? (
                                filtered.map((elem) => {
                                    return <div className="indiv-forum-main" >
                                        <Link to={`/forums/${elem._id}`} style={{textDecoration: "none", color: "#e7e0ec" }}>
                                            <h4>{elem.title}</h4>
                                            <p>Author: <Link to={`/profile/${elem.author._id}`}>{elem.author.username}</Link> </p>
                                            {moment(elem.createdAt).format("LLL")}
                                            </Link>
                                        </div>  
                                })
                            ) : (null)
                        }
                    </div>
            </div>
        )
    }
}
