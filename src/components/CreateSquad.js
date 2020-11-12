import React, {useState} from 'react'
import { Form, Button } from "react-bootstrap"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from "axios"
import { RAWG_API_KEY } from "../config";
var _ = require('lodash');
require('dotenv').config();

export default function CreateSquad(props) {
    const [gameTitles, setTitles] = useState([]);

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

    // only make api query to RAWG every 400ms to limit the number of queries
    // i think this works??
    const delayedGameSearch = _.debounce(handleGameSearch, 500, { leading: true });

    return (
        <div style={{textAlign: "center"}}>
            <h2 style={{color:"#d81284"}}>Create a new squad</h2>
            <Form onSubmit={props.onCreateSquad}>
                <Form.Group >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Squad title" name="title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} name="description" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Max squad size</Form.Label>
                    <Form.Control type="number" name="maxSize" defaultValue={2} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select the game</Form.Label>
                    <Select
                        onInputChange={delayedGameSearch}
                        // closeMenuOnSelect={false}
                        options={gameTitles}
                        styles={customStyles}
                        name="game"
                    />
                </Form.Group>
                <Button type="submit" style={{backgroundColor: "#d81284", border:"1px solid #d81284", marginTop: 15}}>
                    Create!
                </Button>
            </Form>
        </div>
    )
}