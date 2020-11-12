import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../config";
import { API_URL } from "../config";
import Axios from 'axios';
import {Form} from "react-bootstrap"

let socket;
const CONNECTION_PORT = SOCKET_URL;

export default function Chat(props) {
    const [room, setRoom] = useState(props.match.params.id);
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [user, setUser] = useState(null);
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        setUser(props.user);
        if (!user) {
            Axios.get(`${API_URL}/user`, { withCredentials: true })
                .then((response) => {
                    setUser(response.data)
                })
        }
        console.log(props.user)
        
        Axios.get(`${API_URL}/chat/${props.match.params.id}`, {withCredentials: true})
        .then((response) => {
            if(response.data) setMessageList(response.data);
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


    if (user && room && connected) {
        return (
            <div className="chatContainer">
                <div className="messages">
                    {messageList.map((val, key) => {
                        return (
                            <div
                                className="messageContainer"
                                id={val.senderId == user._id ? "You" : "Other"}
                            >
                                <div className="messageIndividual">
                                    {val.senderName}: {val.content}
                                </div>
                            </div>
                        );
                    })}
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
                        <button type="submit">Send</button>
                    </Form>
                </div>
            </div>
        )
    }
    else {
        return <div>this is the chat {props.match.params.id}</div>
    }

}
