import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from "../config";
import { Link } from "react-router-dom"
import {GiShuriken} from "react-icons/gi"

export default function ProfilePage(props) {
    const [user, setUser] = useState(null)
    const [squads, setSquads] = useState(null)

    useEffect(() => {
        Axios.get(`${API_URL}/profile/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {
                setUser(response.data)
                Axios.get(`${API_URL}/profile/${props.match.params.id}/squads`, { withCredentials: true })
                    .then((response) => {
                        setSquads(response.data);
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (!user) {
        return null
    }
    else {
        return (
            <div>
                <h3>{user.username}</h3>
                {
                    (user.image) ? (<img src={user.image} style={{ width: 200, borderRadius: "50%" }} alt="Profile" />)
                        :
                        (<img src="https://res.cloudinary.com/meetpup/image/upload/v1604869142/prof-default-icon_ody7zu.png" style={{ width: 200, borderRadius: "50%" }} alt="Default profile" />)
                }
                <p>
                    <b>Bio:</b> <br />
                    {user.bio}
                </p>
                <p>
                    <b>Platforms:</b> <br />
                    {
                        (user.platforms) ? (
                            user.platforms.map((elem) => {
                                let parsed = JSON.parse(elem);
                                return <div key={parsed.id}>
                                    {parsed.name}
                                </div>
                            })
                        ) : (<p>No platforms specified</p>)

                    }

                </p>
                <p>
                    <b>Favourite Games:</b>
                    {
                        (user.games) ? (
                            user.games.map((elem) => {
                                let parsed = JSON.parse(elem);
                                return <div key={parsed.id}>
                                    <img src={parsed.background_image} alt="Game" style={{ height: 100 }} />
                                    {parsed.name}
                                </div>
                            })
                        ) : <p>No games specified</p>
                    }
                </p>
                <div>
                    <h4>{user.username}'s Squads</h4>
                    {
                        (squads) ? (
                            squads.map((elem) => {
                                if (elem.creator._id === user._id) {
                                    return <div key={elem._id}>
                                        <h6>{elem.title}</h6>
                                        <p>Creator: <b><Link to={elem.creator._id}>{elem.creator.username}</Link></b> <GiShuriken style={{color: "9800ff"}}/> </p>
                                    </div>
                                }
                                else {
                                    return <div key={elem._id}>
                                        <h6>{elem.title}</h6>
                                        <p>Creator: <b><Link to={elem.creator._id}>{elem.creator.username}</Link> </b></p>
                                    </div>
                                }
                            })
                        ) : (null)
                    }
                </div>
            </div>
        )
    }

}
