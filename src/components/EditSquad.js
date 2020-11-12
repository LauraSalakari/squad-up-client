import React, {useState, useEffect} from 'react'
import { Form, Button } from "react-bootstrap"
import Select from 'react-select';
import Axios from "axios"
import { RAWG_API_KEY } from "../config";
import { API_URL } from "../config";
var _ = require('lodash');
require('dotenv').config();

export default function EditSquad(props) {

    const [squad, setSquad] = useState(null);
    const [gameTitles, setTitles] = useState([]);

    useEffect(() => {
        Axios.get(`${API_URL}/squads/${props.match.params.id}`, { withCredentials: true })
        .then((response) => {
            setTitles([{label: response.data.game, value: response.data.game}]);
            setSquad(response.data);
        })
    }, [])

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
                let titles = response.data.results.map(elem => {
                    return { label: elem.name, value: JSON.stringify(elem) }
                })
                setTitles(titles)
            })
    }

    const delayedGameSearch = _.debounce(handleGameSearch, 500, { leading: true });

    const handleEditSquad = (e) => {
        e.preventDefault();
        const {title, description, maxSize, game} = e.target;
        let gameTitle = game.value.name;
        let edited = {
            title: title.value,
            description: description.value,
            maxSize: maxSize.value,
            game: gameTitle
        }

        Axios.patch(`${API_URL}/squads/${props.match.params.id}/edit`, edited, {withCredentials:true})
        .then((response) => {
            console.log(response.data);
            props.history.push(`/squads/${squad._id}`);
        })
    }

    if(!squad){
        return <h3>Edit Your Squad</h3>
    }
    else{
        return (
            <div style={{textAlign: "center"}}>
                <h2 style={{marginBottom: 20, color: "#d81284"}}>Edit Your Squad</h2>
                <Form onSubmit={handleEditSquad}>
                <Form.Group >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" defaultValue={squad.title} name="title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} name="description" defaultValue={squad.description} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Max squad size</Form.Label>
                    <Form.Control type="number" name="maxSize" defaultValue={squad.maxSize} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select the game</Form.Label>
                    <Select
                        onInputChange={delayedGameSearch}
                        closeMenuOnSelect={false}
                        defaultValue={gameTitles[0]}
                        options={gameTitles}
                        styles={customStyles}
                        name="game"
                    />
                </Form.Group>
                <Button style={{backgroundColor: "#d81284", border:"1px solid #d81284", marginTop: 15}}type="submit">
                    Edit!
                </Button>
            </Form>
            </div>
        )
    }
}
