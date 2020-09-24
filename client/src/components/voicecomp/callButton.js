import React from "react";
import { Phone } from "@material-ui/icons";
import { IconButton, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "green",
    },
    "&$disabled": {
      backgroundColor: "#b3ffb3",
    },
  },
  disabled: {},
  hangUp: {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

export function CallButton({ handleMakeCall }) {
  const classes = useStyles();

  return (
    <IconButton
      // disabled={deviceReady ? false : true}
      classes={{
        root: classes.root,
      }}
      onClick={handleMakeCall}
    >
      <Phone fontSize="large" style={{ color: grey[50] }} />
    </IconButton>
  );
}

export function HangUpButton({ handleHangUp }) {
  const classes = useStyles();

  return (
    <IconButton
      // disabled={deviceReady ? false : true}
      classes={{ root: classes.hangUp }}
      onClick={handleHangUp}
    >
      <Phone fontSize="large" style={{ color: grey[50] }} />
    </IconButton>
  );
}
