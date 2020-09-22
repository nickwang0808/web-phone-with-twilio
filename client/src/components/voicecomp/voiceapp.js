import React, { useState, useReducer } from "react";

import { Box, Grid } from "@material-ui/core";
import NumberBox from "./numberBox";
import KeyPad from "./keypad";
const { Device } = require("twilio-client");

// when in DEVMODE no fetch call will be made

// keypad operation, seems simpler with useReducer
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { number: state.number + action.payload };

    case "match":
      return { number: action.payload };

    case "del":
      return { number: state.number.slice(0, -1) };

    default:
      return state.number;
  }
}

function VoiceApp({ deviceReady, connectionError, incoming, DEVMODE }) {
  const [state, dispatch] = useReducer(reducer, { number: "+" });
  const [connection, setConnection] = useState(false);

  const handleHangUp = () => {
    Device.disconnectAll();
    setConnection(false);
  };

  const handleMakeCall = () => {
    const params = { number: state.number };

    // const params = { number: number };
    Device.connect(params);
    setConnection(true);
  };

  return (
    <Box
      flexGrow="1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      pb={3}
      pt={2}
    >
      <NumberBox dispatch={dispatch} value={state.number} />

      {DEVMODE && <p>Dev Mode</p>}
      {connectionError && (
        <Box textAlign="center">
          <h3>{connectionError}</h3>
        </Box>
      )}

      <Grid item container direction="column" alignItems="center">
        <KeyPad
          handleHangUp={handleHangUp}
          handleMakeCall={handleMakeCall}
          connection={connection}
          setConnection={setConnection}
          deviceReady={deviceReady}
          dispatch={dispatch}
        />
      </Grid>
    </Box>
  );
}

export default VoiceApp;
