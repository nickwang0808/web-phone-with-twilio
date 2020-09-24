import { Avatar, Box, Grid, IconButton, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import {
  MicOff,
  Dialpad,
  VolumeUp,
  AddIcCall,
  Pause,
} from "@material-ui/icons";
import { HangUpButton } from "./callButton";
import { Device } from "twilio-client";

const useStyles = makeStyles((theme) => ({
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
}));

function ActionButton({ children, label, handler, disabled }) {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Box display="flex" flexDirection="column" justifyContent="center" mt={1}>
        <IconButton
          // onClick={handler}
          classes={{ label: classes.iconButtonLabel }}
          disabled={disabled}
        >
          {children}
          <span style={{ marginTop: "8px", fontSize: "16px" }}>{label}</span>
        </IconButton>
      </Box>
    </Grid>
  );
}

export default function ActiveCall() {
  // props aren't getting passed from voiceaoo to here. leaving this method here for now
  const handleHangUp = () => {
    Device.disconnectAll();
    // setConnection(false);
    console.log("hungup");
  };
  return (
    <>
      <Box
        flexGrow="1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        pb={3}
        pt={2}
        bgcolor="#e6e6e6"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <h2>Random Person</h2>
          <div>00:11</div>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container justify="center" alignItems="center">
            <ActionButton label="Mute">
              <MicOff fontSize="large" />
            </ActionButton>
            <ActionButton label="DialPad">
              <Dialpad fontSize="large" />
            </ActionButton>
            <ActionButton label="Speaker">
              <VolumeUp fontSize="large" />
            </ActionButton>
            <ActionButton label="Add">
              <AddIcCall fontSize="large" />
            </ActionButton>
            <ActionButton label="hold">
              <Pause fontSize="large" />
            </ActionButton>
            <ActionButton disabled={true} />
          </Grid>
          <Box mt={2} />
          <HangUpButton handleHangUp={handleHangUp} />
        </Box>
      </Box>
    </>
  );
}
