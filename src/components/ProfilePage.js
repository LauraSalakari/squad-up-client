import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from "../config";

export default function ProfilePage(props) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        Axios.get(`${API_URL}/profile/${props.match.params.id}`, {withCredentials: true})
            .then((response) => {
                setUser(response.data)
            })
    }, [])

    if (!user) {
        return null
    }
    else {
        return (
            <div>
                <h3>{user.username}</h3>
                <img src={user.image} style={{ width: 200 }} alt="Profile" />
                <p>
                    <b>Bio:</b> <br />
                    {user.bio}
                </p>
                <p>
                    <b>Platforms:</b> <br />
                    {
                        user.platforms.map((elem) => {
                            let parsed = JSON.parse(elem);
                            return <div key={parsed.id}>
                                {parsed.name}
                            </div>
                        })
                    }
                </p>
                <p>
                    <b>Favourite Games:</b>
                    {
                        user.games.map((elem) => {
                            let parsed = JSON.parse(elem);
                            return <div key={parsed.id}>
                                <img src={parsed.background_image} alt="Game" style={{ height: 100 }} />
                                {parsed.name}
                            </div>
                        })
                    }
                </p>
            </div>
        )
    }

}
