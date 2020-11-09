import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { API_URL } from "../config";
import moment from 'moment';

export default function Squads() {

    const [squads, setSquads] = useState([]);

    useEffect(() => {
        // request squads
        Axios.get(`${API_URL}/squads`, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
                setSquads(response.data);
            })
    }, [])


    return (
        <div>
            <Link to="/squads/create">
                <Button variant="primary" size="lg" block>
                    Create a Squad!
                </Button>
            </Link>
            <Form.Control type="text" placeholder="Search squads" name="squadSearch" />
            <div>
                {
                    squads.map((elem) => {
                        return <div key={elem._id}>
                            <h5>{elem.title}</h5>
                            <p><b>Game: </b>{elem.game}</p>
                            <p><b>Creator: </b><Link to={`/profile/${elem.creator._id}`}>{elem.creator.username}</Link></p>
                            {moment(elem.createdAt).format("LLL")}
                        </div>
                    })
                }
            </div>
            {/* search input, list of squads here */}
        </div>
    )
}
