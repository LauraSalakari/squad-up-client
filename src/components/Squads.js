import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { API_URL } from "../config";
import moment from 'moment';

export default function Squads() {

    const [squads, setSquads] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        // request squads
        Axios.get(`${API_URL}/squads`, { withCredentials: true })
            .then((response) => {
                setSquads(response.data);
                setFiltered(response.data);
            })
    }, [])

    const handleSquadSearch = (e) => {
        let search = e.target.value;
        let filteredSquads = squads.filter((elem) => {
            return (elem.game.toLowerCase().includes(search.toLowerCase()) || elem.title.toLowerCase().includes(search.toLowerCase()))
        })
        setFiltered(filteredSquads);
    }

    return (
        <div>
            <Link to="/squads/create">
                <Button variant="primary" size="lg" block>
                    Create a Squad!
                </Button>
            </Link>
            <Form.Control type="text" placeholder="Search squads" name="squadSearch" onChange={handleSquadSearch} />
            <div>
                {
                    squads ? (
                        filtered.map((elem) => {
                        return <Link key={elem._id} to={`/squads/${elem._id}`} style={{textDecoration: "none", color: "#e7e0ec"}} >
                            <div style={{ border: "1px #e7e0ec solid", padding: 5, margin: 10 }}>
                                <h5>{elem.title}</h5>
                                <p><b>Game: </b>{elem.game}</p>
                                <p><b>Creator: </b><Link to={`/profile/${elem.creator._id}`}>{elem.creator.username}</Link></p>
                                {moment(elem.createdAt).format("LLL")}
                            </div>
                        </Link>
                    })
                    ) : (null)
                }
            </div>
        </div>
    )
}
