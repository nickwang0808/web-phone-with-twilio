import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Slide,
} from "@material-ui/core";
import { Phone, Clear } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: "0px",
    width: "100%",
    backgroundColor: "white",
    zIndex: "10000",
  },
});

export default function IncomingPopup({ display, setDisplayIncoming }) {
  const classes = useStyles();

  return (
    <Slide direction="down" in={display} mountOnEnter unmountOnExit>
      <Box className={classes.root}>
        <Paper>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>{/* <BeachAccessIcon /> */}</Avatar>
              </ListItemAvatar>
              <ListItemText primary="(306) 234-2345" secondary="incoming" />
              <span>3 30pm</span>
            </ListItem>
            <Divider variant="inset" />
            <Box display="flex" justifyContent="space-around">
              <Button
                style={{ color: "green" }}
                onClick={() => setDisplayIncoming(false)}
              >
                <Phone style={{ marginRight: "8px" }} />
                Accept
              </Button>
              <Button
                style={{ color: "red" }}
                onClick={() => setDisplayIncoming(false)}
              >
                <Clear style={{ marginRight: "8px" }} />
                Reject
              </Button>
            </Box>
          </List>
        </Paper>
      </Box>
    </Slide>
  );
}
