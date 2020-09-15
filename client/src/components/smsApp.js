import React, { useState } from "react";
// eslint-disable-next-line
import SmsDetail from "./smsdetail";
import { Box, makeStyles } from "@material-ui/core";
import { useFireStoreAllDocs } from "./hooks/useFirestore";
// mui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { FiberManualRecord } from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
    color: "black",
  },
  dummy: {
    justify: "center",
  },
}));

function SmsPreview({ from, content, time, onClick, isRead }) {
  const classes = useStyles();

  return (
    <>
      <ListItem onClick={onClick}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={from}
          secondary={content.slice(0, 30)}
          classes={
            !isRead
              ? { secondary: classes.bold, primary: classes.bold }
              : { secondary: classes.dummy }
          }
        />
        <span>{`${time.day}/${time.month}`}</span>
        {!isRead && (
          <FiberManualRecord
            color="primary"
            fontSize="small"
            style={{ marginLeft: "12px" }}
          />
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default function SmsApp() {
  const { messages } = useFireStoreAllDocs("messages");
  const [numToView, setNumToView] = useState(null);

  if (!numToView) {
    return (
      <>
        <Box pl={1}>
          <List>
            {messages.map((message) => {
              let [
                day,
                month,
                year,
              ] = message.timeStamp.toDate().toLocaleDateString().split("/");
              return (
                <SmsPreview
                  onClick={() => setNumToView(message.from)}
                  time={{ day, month, year }}
                  key={message.timeStamp}
                  from={message.from}
                  isRead={message.isRead}
                  content={message.messageBody}
                />
              );
            })}
          </List>
        </Box>
      </>
    );
  } else {
    return <SmsDetail numToView={numToView} setNumToView={setNumToView} />;
  }
}
