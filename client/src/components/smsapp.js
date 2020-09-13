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
import FromBar from "./smscomp/fromBar";

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
      <Paper className={classes.messageBox}>{body}</Paper>
    </Box>
  );
}

export default function SmsApp() {
  const [messages, setMessages] = useState([]);
  const [from, setFrom] = useState("");
  const [input, setInput] = useState("");
  // eslint-disable-next-line
  const [myNum, setMyNum] = useState("+16046708235"); // just for now,use server to provide this in teh future
  // eslint-disable-next-line
  const [sentStatus, setSentStatus] = useState(false);
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

  const handleSendMessage = async () => {
    try {
      const url = "http://35.220.218.52:3000/message/send";
      const data = {
        Body: input,
        From: myNum,
        To: from,
      };
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      response === 200 ? setSentStatus(true) : setSentStatus(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FromBar from={from} />
      <Box
        flexGrow="1"
        display="flex"
        flexDirection="column"
        justifyContent="end"
        bgcolor="#ffffff"
        pb={1}
        p={2}
        overflow="auto"
      >
        {messages.map((data) => (
          <Message
            key={data.timeStamp}
            body={data.messageBody}
            incoming={data.incoming}
          />
        ))}
        <div ref={bottomRef} />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          onChange={(c) => setInput(c.target.value)}
        />
        <IconButton onClick={handleSendMessage} disabled={input ? false : true}>
          <Send />
        </IconButton>
      </Box>
    </>
  );
}
