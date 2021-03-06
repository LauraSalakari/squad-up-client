import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom"


export default function ChatLog(props) {
    const [user, setUser] = useState(props.user);
    const [squads, setSquads] = useState(null);

    useEffect(() => {
        if (!user) {
            Axios.get(`${API_URL}/user`, { withCredentials: true })
                .then((response) => {
                    setUser(response.data)
                    Axios.get(`${API_URL}/profile/${response.data._id}/squads`, { withCredentials: true })
                        .then((response) => {
                            setSquads(response.data);
                        })
                })
        }
        else {
            Axios.get(`${API_URL}/profile/${user._id}/squads`, { withCredentials: true })
                .then((response) => {
                    setSquads(response.data);
                })
        }
    }, [])


    return (
        <div className="chatlog-div">
            <h2 style={{ color: "#d81284" }}>Chats</h2>
            {
                squads ? (<div>
                    {
                        squads.map((elem) => {
                            return <div className="chat-detail-div" key={elem._id}>
                                <Link to={`/chat/${elem._id}`}  style={{ textDecoration: "none", color: "#e7e0ec" }}>
                                    <h6>{elem.title}</h6>
                                    <p>Creator: <b><Link to={`/profile/${elem.creator._id}`}>{elem.creator.username}</Link> </b></p>
                                </Link>
                            </div>
                        })
                    }
                </div>) : (<div>No chats yet, join a squad to start chatting!</div>)
            }
        </div>
    )
}
