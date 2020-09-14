import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  makeStyles,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import FromBar from "./smscomp/fromBar";
import { useFireStoreOneDoc } from "./hooks/useFirestore";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  messageBox: {
    maxWidth: "65vw",
    padding: theme.spacing(2),
    wordWrap: "break-word",
    borderRadius: "10px",
  },
  notIncoming: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  incoming: {
    backgroundColor: grey[200],
  },
}));

function Message({ body, incoming }) {
  const classes = useStyles(incoming);

  return (
    <Box
      display="flex"
      justifyContent={incoming ? "flex-start" : "flex-end"}
      flexWrap="wrap"
      whiteSpace="normal"
      pb={1}
    >
      <Paper
        className={`${classes.messageBox} ${
          incoming ? classes.incoming : classes.notIncoming
        }`}
      >
        {body}
      </Paper>
    </Box>
  );
}

// ==============================================================
export default function SmsDetail({ numToView, setNumToView }) {
  const [input, setInput] = useState("");
  const myNum = "+16046708235";
  // eslint-disable-next-line
  const [sentStatus, setSentStatus] = useState(false);
  const bottomRef = useRef(null);

  const { messages } = useFireStoreOneDoc("messages", numToView);

  useEffect(() => {
    bottomRef.current.scrollIntoView();
  }, [messages]);

  const handleSendMessage = async () => {
    try {
      const url = "http://35.220.218.52:3000/message/send";
      const data = {
        Body: input,
        From: myNum,
        To: numToView,
      };
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      response === 200 ? setSentStatus(true) : setSentStatus(false);
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FromBar from={numToView} setNumToView={setNumToView} />
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
