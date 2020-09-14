import React, { useEffect } from "react";
// eslint-disable-next-line
import SmsDetail from "./smsdetail";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { useFireStoreAllDocs } from "./hooks/useFirestore";
// mui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: "1px",
}));

function SmsPreview({ from, content, time }) {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={from} secondary={content.slice(0, 30)} />
        <span>{`${time.day}/${time.month}`}</span>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default function SmsApp() {
  const { messages } = useFireStoreAllDocs("messages");

  return (
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
              key={message.timeStamp}
              time={{ day, month, year }}
              from={message.from}
              content={message.messageBody}
            />
          );
        })}
      </List>
    </Box>
  );
}
