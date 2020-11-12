import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from "../config";
import { Link } from "react-router-dom"
import { GiJewelCrown, GiTumbleweed } from "react-icons/gi"

export default function ProfilePage(props) {
    const [user, setUser] = useState(null)
    const [squads, setSquads] = useState(null)
    const [userId, setUserId] = useState(props.match.params.id);


    const fetchUser = () => {
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
    }

    useEffect(() => {
        fetchUser();
    }, [])

    useEffect(() => {
        if (userId != props.match.params.id) {
            fetchUser();
            setUserId(props.match.params.id);
        }
    })

    if (!user) {
        return null
    }
    else {
        return (
            <div className="prof-div">

                {
                    (user.image) ? (<img src={user.image} style={{ width: 200, borderRadius: "50%" }} alt="Profile" />)
                        :
                        (<img src="https://res.cloudinary.com/meetpup/image/upload/v1604869142/prof-default-icon_ody7zu.png" style={{ width: 200, borderRadius: "50%" }} alt="Default profile" />)
                }
                <h3>{user.username}</h3>
                <p>
                    <b>Bio:</b> <br />
                    {user.bio}
                </p>
                <div className="prof-features-container">
                    <div className="prof-feature-div">
                        <h4>Platforms:</h4>
                        {
                            (user.platforms) ? (
                                user.platforms.map((elem) => {
                                    let parsed = JSON.parse(elem);
                                    return <div key={parsed.id}>
                                        {parsed.name}
                                    </div>
                                })
                            ) : (<p><GiTumbleweed/> <br/> No platforms specified</p>)

                        }

                    </div>
                    <div className="prof-feature-div">
                        <h4>Favourite Games:</h4>
                        {
                            (user.games) ? (
                                user.games.map((elem) => {
                                    let parsed = JSON.parse(elem);
                                    return <div key={parsed.id} className="indiv-game-div">
                                        <img src={parsed.background_image} alt="Game" className="prof-game-img" />
                                        {parsed.name}
                                    </div>
                                })
                            ) : <p>No games specified</p>
                        }
                    </div>
                    <div className="prof-feature-div prof-squad-container">
                        <h4>{user.username}'s Squads</h4>
                        {
                            (squads) ? (
                                squads.map((elem) => {
                                    if (elem.creator._id === user._id) {
                                        return <div key={elem._id} className="prof-squad-div">
                                            <h6>{elem.title}</h6>
                                            <p>Creator: <GiJewelCrown style={{ color: "9800ff" }} /> <b><Link to={`/profile/${elem.creator._id}`}>{elem.creator.username}</Link></b>  </p>
                                        </div>
                                    }
                                    else {
                                        return <div key={elem._id} className="prof-squad-div">
                                            <h6>{elem.title}</h6>
                                            <p>Creator: <b><Link to={`/profile/${elem.creator._id}`}>{elem.creator.username}</Link> </b></p>
                                        </div>
                                    }
                                })
                            ) : (null)
                        }
                    </div>
                </div>
            </div>
        )
    }

}
