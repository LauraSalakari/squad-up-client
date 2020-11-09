import React from 'react'
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"


export default function Squads() {
    return (
        <div>
            <Link to="/squads/create">
                <Button variant="primary" size="lg" block>
                    Create a Squad!
                </Button>
            </Link>
            {/* search input, list of squads here */}
        </div>
    )
}
