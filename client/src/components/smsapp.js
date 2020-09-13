import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  makeStyles,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { db } from "../firebase/config";

const useStyles = makeStyles((theme) => ({
  messageBox: {
    maxWidth: "200px",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    wordWrap: "break-word",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "10px",
  },
}));

function Message({ body, incoming }) {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent={incoming ? "flex-start" : "flex-end"}
      flexWrap="wrap"
      whiteSpace="normal"
      py={1}
    >
      {/* <Paper className={classes.messageBox}>{body}</Paper> */}
      <Paper className={classes.messageBox}>
        {body}
        adawdawdawdawdawdwawdadawdawdawdawdawdwawdadawdawdawdawdawdwa
      </Paper>
    </Box>
  );
}

export default function SmsApp() {
  const [messages, setMessages] = useState([]);
  const [from, setFrom] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    db.collection("messages")
      .doc("+8618612441878")
      .onSnapshot((doc) => {
        setMessages(doc.data().message);
        setFrom(doc.data().from);
        console.log(doc.data().message);
      });
  }, [setMessages, setFrom]);

  useEffect(() => {
    console.log("scroll");
    bottomRef.current.scrollIntoView();
  }, [messages]);

  return (
    <>
      <Box height="150px">{`From: ${from}`}</Box>
      <Box
        flexGrow="1"
        display="flex"
        flexDirection="column"
        justifyContent="start"
        bgcolor="#ffffff"
        pb={3}
        pt={2}
        overflow="auto"
      >
        {messages.map((data) => (
          <Message
            key={data.messageContent}
            body={data.messageContent}
            incoming={data.incoming}
          />
        ))}
        {messages.map((data) => (
          <Message
            key={data.messageContent}
            body={data.messageContent}
            incoming={data.incoming}
          />
        ))}
        {messages.map((data) => (
          <Message
            key={data.messageContent}
            body={data.messageContent}
            incoming={data.incoming}
          />
        ))}
        {messages.map((data) => (
          <Message
            key={data.messageContent}
            body={data.messageContent}
            incoming={data.incoming}
          />
        ))}
        {messages.map((data) => (
          <Message
            key={data.messageContent}
            body={data.messageContent}
            incoming={data.incoming}
          />
        ))}
        <div ref={bottomRef} />
      </Box>
      <Box py={1} display="flex">
        <TextField variant="outlined" fullWidth="true" />
        <IconButton>
          <Send />
        </IconButton>
      </Box>
    </>
  );
}
