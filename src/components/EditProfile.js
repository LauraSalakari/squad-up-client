import React, { useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from "axios"
import bsCustomFileInput from 'bs-custom-file-input';
import { RAWG_API_KEY } from "../config";
import { API_URL } from "../config";
var _ = require('lodash');

require('dotenv').config();

export default function EditProfile(props) {

    const [platforms, setPlatforms] = useState([]);
    const [userPlatforms, choosePlatforms] = useState([]);  // this will get fed from the user info
    const [games, setGames] = useState([]);
    const [gameTitles, setTitles] = useState([]);
    const [userGames, setUserGames] = useState([]); // this will get fed from the user info
    const animatedComponents = makeAnimated();

    //this currently controls the react-select dropdown colours for the game search
    const customStyles = {
        option: provided => ({
            ...provided,
            color: 'black'
        }),
        control: provided => ({
            ...provided,
            color: 'black'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black'
        })
    }

    useEffect(() =>{
        bsCustomFileInput.init();

        Axios.get(`${API_URL}/platforms`, {withCredentials: true})
        .then((response) => {
            let platformData = response.data.map((elem) => {
                return {label: elem.name, value: JSON.stringify(elem)}
            })
            setPlatforms(platformData);
        })
        .catch((err) => {
            console.log(err, "failed to fetch platforms");
        })
    }, [])


    const handleGameSearch = (e) => {
        Axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${e}`)
            .then((response) => {
                // setGames(response.data.results);
                let titles = response.data.results.map(elem => {
                    return { label: elem.name, value: JSON.stringify(elem) }
                })
                setTitles(titles)
            })
    }

    // only make api query to RAWG every 400ms to limit the number of queries
    // i think this works?? NOPE!
    const delayedGameSearch = _.debounce(handleGameSearch, 400, {leading:true});


    return (
        <div>
            <h3>Edit your profile</h3>
            <h5>Account Details</h5>
            <Form onSubmit={props.onEditProfile} encType="multipart/form-data" >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={props.user.username} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={props.user.email} />
                </Form.Group>
                <h5>Profile</h5>
                <Form.Group>
                <Form.Label>Profile picture</Form.Label>
                    <Form.File
                        id="custom-file"
                        label="Choose a file"
                        class="custom-file-input"
                        custom
                        name="image"
                        accept="image/png, image/jpeg"
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control as="textarea" rows={5} name="bio" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Choose your platforms</Form.Label>
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={platforms}
                        styles={customStyles}
                        name="platforms"
                    />

                </Form.Group>
                <Form.Group>
                    <Form.Label>Select your favourite games</Form.Label>
                    <Select
                        onInputChange={delayedGameSearch}
                        closeMenuOnSelect={false}
                        isMulti
                        options={gameTitles}
                        styles={customStyles}
                        name="games"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
