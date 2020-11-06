import React, { useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from "axios"

require('dotenv').config();

export default function EditProfile(props) {

    const platforms = ["PC", "PlayStation", "XBox", "Nintendo Switch", "Mobile", "Other"];
    const [userPlatforms, choosePlatforms] = useState([]);  // this will get fed from the user info
    const [games, setGames] = useState([]);
    const [gameTitles, setTitles] = useState([]);
    const [userGames, setUserGames] = useState([]); // this will get fed from the user info
    const animatedComponents = makeAnimated();


    useEffect(() => {
        Axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`)
            .then((response) => {
                setGames(response.data);
                let titles = response.data.map((elem) => {
                    return elem.name
                })
                setTitles(titles);
            })
            .catch((err) => {
                console.log(err, "Failed to load games data")
            })
    }, [])

    return (
        <div>
            <h3>Edit your profile</h3>
            <h5>Account Details</h5>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control plaintext readOnly defaultValue="Username" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control plaintext readOnly defaultValue="email@email.com" />
                </Form.Group>
                <h5>Profile</h5>
                <Form>
                    <Form.File
                        id="custom-file"
                        label="Custom file input"
                        custom
                    />
                </Form>
                <Form.Text className="text-muted">
                    Tell people a bit about yourself!
                </Form.Text>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Choose your platforms</Form.Label>
                    {
                        platforms.map((elem) => {
                            return <div key={`default-${elem}`} className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id={`default-${elem}`}
                                    label={`${elem}`}
                                />
                            </div>
                        })
                    }

                </Form.Group>
                <Form.Group>
                    <Form.Label>Select your favourite games</Form.Label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={games}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
