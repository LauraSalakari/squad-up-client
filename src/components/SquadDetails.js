import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from 'moment';

export default function SquadDetails(props) {
    const [squad, setSquad] = useState(null)
    const [members, setMembers] = useState([])

    useEffect(() => {
        Axios.get(`${API_URL}/squads/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {
                let memberIds = response.data.members.map(e => e._id);
                setMembers(memberIds);
                setSquad(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleJoinSquad = () => {
        console.log("clicked", props.user.username)
        Axios.patch(`${API_URL}/squads/${props.match.params.id}/join`, { userId: props.user._id }, { withCredentials: true })
            .then((response) => {
                let memberIds = response.data.members.map(e => e._id);
                setMembers(memberIds);
                setSquad(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteSquad = () => {
        Axios.delete(`${API_URL}/squads/${props.match.params.id}/delete`, { withCredentials: true })
            .then((response) => {
                props.history.push("/squads")
            })
    }

    const handleLeaveSquad = (e) => {
        Axios.patch(`${API_URL}/squads/${props.match.params.id}/leave`, { userId: props.user._id }, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                let memberIds = response.data.members.map(e => e._id);
                setMembers(memberIds);
                setSquad(response.data)
            })
    }

    if (!squad) {
        return null;
    }
    else {
        return (
            <div>
                <h3>{squad.title}</h3>
                <p>Game: <b>{squad.game}</b></p>
                <p>Creator: <Link to={`/profile/${squad.creator._id}`}>{squad.creator.username}</Link></p>
                <p>Created at: {moment(squad.createdAt).format("LLL")}</p>
                <p style={{ border: "1px #e7e0ec solid", padding: 15, margin: 10, borderRadius: 6 }}>
                    <b>Description:</b> <br />
                    {squad.description}
                </p>
                <div>
                    <h5>Squad members:</h5>
                    <dl>
                        {
                            squad.members.map((elem) => {
                                return <li key={elem._id}><Link to={`/profile/${elem._id}`}>{elem.username}</Link></li>
                            })
                        }
                    </dl>
                </div>
                {
                    (props.user._id == squad.creator._id) ? (
                        <div>
                            <Link to={`/chat/${squad._id}`}><Button>Go to chat</Button></Link>
                            <Button variant="danger" onClick={handleDeleteSquad}>Delete Squad</Button>
                            <Link to={`/squads/${squad._id}/edit`}><Button variant="secondary">Edit Squad</Button></Link>
                        </div>
                    ) : (
                            (members.includes(props.user._id)) ? (
                                <>
                                    <Link to={`/chat/${squad._id}`}><Button>Go to chat</Button></Link>
                                    <Button variant="danger" onClick={handleLeaveSquad}>Leave Squad</Button>
                                </>
                            ) : ((members.length < squad.maxSize) ? (<Button variant="primary" onClick={handleJoinSquad}>Join Squad</Button>) : (null))
                        )
                }

            </div>
        )
    }

}
