import React, { useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import Axios from "axios"
import bsCustomFileInput from 'bs-custom-file-input';
import { RAWG_API_KEY } from "../config";
import { API_URL } from "../config";
var _ = require('lodash');

require('dotenv').config();

export default function EditProfile(props) {

    const [platforms, setPlatforms] = useState([]);
    const [userInfo, setUserInfo] = useState(props.user)
    const [gameTitles, setTitles] = useState([]);
    // const animatedComponents = makeAnimated();

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

    useEffect(() => {
        bsCustomFileInput.init();

        Axios.get(`${API_URL}/platforms`, { withCredentials: true })
            .then((response) => {
                let platformData = response.data.map((elem) => {
                    return { label: elem.name, value: JSON.stringify(elem) }
                })
                setPlatforms(platformData);
            })
            .catch((err) => {
                console.log(err, "failed to fetch platforms");
            })
    }, [])


    const handleGameSearch = (e) => {
        Axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&search=${e}`)
            .then((response) => {
                // setGames(response.data.results);
                let titles = response.data.results.map(elem => {
                    return { label: elem.name, value: JSON.stringify(elem) }
                })
                setTitles(titles)
            })
    }

    const delayedGameSearch = _.debounce(handleGameSearch, 500);


    if (!props.user) return null;
    else {
        return (
            <div className="account-settings-main">
                <h3>Edit your profile</h3>

                <Form onSubmit={props.onEditProfile} encType="multipart/form-data" >
                    <div className="acc-containers-macro">
                        <div className="account-containers">
                            <h5>Account Details</h5>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                {
                                    props.user ? (<Form.Control readOnly defaultValue={props.user.username} style={{ color: "#636c73" }} />) : null
                                }

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                {
                                    props.user ? (<Form.Control readOnly defaultValue={props.user.email} style={{ color: "#636c73" }} />) : null
                                }

                            </Form.Group>
                            <h5 style={{marginTop: 30}}>Profile Picture</h5>
                            <Form.Group>
                                <div>
                                    Your current profile picture: <br />
                                    {
                                        props.user.image ? (<img src={props.user.image} alt="profile preview" style={{ width: 100, borderRadius: "50%" }} />) : "No profile picture set"
                                    }
                                </div>
                                <p>Upload a new picture:</p>
                                <Form.File
                                    id="custom-file"
                                    label="Choose a file"
                                    class="custom-file-input"
                                    custom
                                    name="image"
                                    accept="image/png, image/jpeg"
                                    style={{textAlign: "left"}}
                                />

                            </Form.Group>
                        </div>
                        <div className="account-containers">
                        <h5>Profile</h5>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>About Me</Form.Label>
                                <Form.Control as="textarea" rows={5} name="bio" defaultValue={props.user.bio} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Choose your platforms</Form.Label>
                                <Select
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={platforms}
                                    styles={customStyles}
                                    name="platforms"
                                    defaultValue={
                                        (props.user.platforms && props.user.games[0] != "") ? (
                                            props.user.platforms.map((elem) => {
                                                return { label: JSON.parse(elem).name, value: elem }
                                            })
                                        ) : (null)
                                    }
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
                                    defaultValue={
                                        (props.user.games && props.user.games[0] != "") ? (
                                            props.user.games.map((elem) => {
                                                return { label: JSON.parse(elem).name, value: elem }
                                            })
                                        ) : (null)
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Button variant="primary" type="submit">
                        Edit Profile
                    </Button>

                </Form>
            </div>
        )
    }

}
