import React, { Component, useState, useEffect } from 'react';
//import '../App.css';
import firebase from "firebase"
import { Input, List, ListItem, ListItemText, Button, TextField } from "@material-ui/core"

export default function FCChat(props) {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([])
    const [uname, setUname] = useState("amit")

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "...",
            authDomain: "...",
            databaseURL: "...",
            projectId: "...",
            storageBucket: "...",
            messagingSenderId: "...",
            appId: "..."
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        getMessages()
    }, [])

    const onSubmit = (event) => {
        if (uname == "amit") {
            if (event.charCode === 13 && text.trim() !== "") {
                console.log(uname + ":\n" + text)
                writeMessageToDb(uname + ":\n" + text);
                setText("")
                setUname("timor")
            }
        }
        else {
            if (event.charCode === 13 && text.trim() !== "") {
                console.log(uname + ":\n" + text)
                writeMessageToDb(uname + ":\n" + text)
                setText("")
                setUname("amit")
            }
        }
    }
    const writeMessageToDb = (message) => {
        firebase
            .database()
            .ref("Chat/")
            .push({
                text: message
            })
    }
    const getMessages = () => {
        let messagesDb = firebase.database().ref("Chat/")
        messagesDb.on("value", snapshot => {
            let newMessages = []
            snapshot.forEach(child => {
                var message = child.val()
                newMessages.push({ id: child.key, text: message.text })
            })
            setMessages(newMessages)
        })
    }
    const renderMessages = () => {
        return messages.map((message) =>
            <ListItem>
                <ListItemText>{message.text} </ListItemText>
            </ListItem>)
    }
    return (
        <div style={{ width: 300, margin: "auto" }}>
            <List>
                {renderMessages()}
            </List>
            <TextField
                autoFocus={true}
                multiline={true}
                fullWidth={true}
                rowsMax={3}
                placeholder="Type somthing"
                onChange={event => setText(event.target.value)}
                value={text}
                onKeyPress={(e) => onSubmit(e)}
            />
        </div>
    );
}
