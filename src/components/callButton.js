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

function CallButton({ handleMakeCall, handleHangUp, connection }) {
  const classes = useStyles();

  return (
    <IconButton
      // disabled={deviceReady ? false : true}
      classes={
        connection
          ? { root: classes.hangUp }
          : {
              disabled: classes.disabled,
              root: classes.root,
            }
      }
      onClick={connection ? handleHangUp : handleMakeCall}
    >
      <Phone fontSize="large" style={{ color: grey[50] }} />
    </IconButton>
  );
}

export default CallButton;
