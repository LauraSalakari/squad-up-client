import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { API_URL } from "../config";
import {Link} from "react-router-dom"

export default function SquadDetails(props) {
    const [squad, setSquad] = useState(null)

    useEffect(() => {
        Axios.get(`${API_URL}/squads/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setSquad(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if(!squad){
        return null;
    }
    else{
        return (
            <div>
                <h3>{squad.title}</h3>
                <p>Game: <b>{squad.game}</b></p>
                <p>Creator: {squad.creator.username}</p>
            </div>
        )
    }

}
