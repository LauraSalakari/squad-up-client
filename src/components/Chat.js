import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../config";
import { API_URL } from "../config";
import Axios from 'axios';
import { Form, Spinner } from "react-bootstrap"
import { FiSend } from "react-icons/fi"


let socket;
const CONNECTION_PORT = SOCKET_URL;

export default function Chat(props) {
    const [room, setRoom] = useState(props.match.params.id);
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [user, setUser] = useState(null);
    const [connected, setConnected] = useState(false)
    const [squad, setSquad] = useState(null)

    useEffect(() => {
        setUser(props.user);
        if (!user) {
            Axios.get(`${API_URL}/user`, { withCredentials: true })
                .then((response) => {
                    setUser(response.data)
                })
        }
        console.log(props.user)

        Axios.get(`${API_URL}/chat/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {
                if (response.data) setMessageList(response.data);
            })

        Axios.get(`${API_URL}/squads/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {

                setSquad(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

        socket = io(CONNECTION_PORT);
        connectToRoom();
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList([...messageList, data]);
        });
    });

    const connectToRoom = () => {
        socket.emit("join_room", room);
        setConnected(true)
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        let messageContent = {
            room: room,
            senderId: user._id,
            senderName: user.username,
            content: message,
        };

        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent]);
        setMessage("");
        e.target.message.value = "";
        console.log(messageList)
    };

    useEffect(() => {
        return (() => {
            socket.emit('disconnect');
            socket.disconnect();
            console.log("disconnected")
        });
    }, [])


    if (user && room && connected && squad) {
        return (<div className="chat-main-div">
            <h2 style={{ textAlign: "center" }}>{squad.title}</h2>
            <div className="chatContainer">
                <div className="scroll-container">
                    <div className="messages">
                        {messageList.map((val, key) => {
                            return (
                                <div
                                    className="messageContainer"
                                    id={val.senderId == user._id ? "You" : "Other"}
                                >
                                    <div className="messageIndividual">
                                        <span style={{ color: "#283239" }}>{val.senderName}:</span> {val.content}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="messageInputs">
                    <Form onSubmit={sendMessage}>
                        <input
                            type="text"
                            placeholder="Message..."
                            name="message"
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                        />
                        <button type="submit"><FiSend /></button>
                    </Form>
                </div>
            </div>
        </div>)
    }
    else {
        return <Spinner animation="grow" variant="secondary" />

    }

}
