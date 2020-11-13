import React from 'react'
import {GiLighthouse, GiConsoleController} from "react-icons/gi"
import { Link } from "react-router-dom"

export default function Landing() {
    return (
        <div className="landing-div">
            <h1>Welcome to <span style={{color: "#9800ff"}}>SquadUp!</span></h1>
            <p>Squad up is a your go-to place to find like-minded new friends!</p>
            <div className="feature-container-div">
            <Link to={"/squads"} style={{textDecoration: "none", color: "#e7e0ec"}}>
            <div className="feature-div">
            <p><GiConsoleController size={80} style={{color: "#9800FF"}}/></p>
                Find and connect with your new gaming squad or create a new squad!
            </div>
            </Link>
            <Link to={"/forums"} style={{textDecoration: "none", color: "#e7e0ec"}}>
            <div className="feature-div">
                <p><GiLighthouse size={80} style={{color: "#9800FF"}}/></p>
                Be  avoice in the community and join the conversation in the forums!
            </div>
            </Link>
            </div>
            <p>Squad up is committed to creating a safe and inclusive space.</p>

        </div>
    )
}
