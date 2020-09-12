import React, { useState, useEffect, useReducer } from "react";

import { Box, Grid, CircularProgress } from "@material-ui/core";
import NumberBox from "./voicecomp/numberBox";
import KeyPad from "./voicecomp/keypad";
const { Device } = require("twilio-client");

// when in DEVMODE no fetch call will be made
const DEVMODE = false;

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

function VoiceApp() {
  const [deviceReady, setDeviceReady] = useState(false);
  const [initError, setInitError] = useState(false);
  const [error, setError] = useState(null);
  const [connection, setConnection] = useState(false);
  const [incoming, setIncoming] = useState(false);

  const [state, dispatch] = useReducer(reducer, { number: "+" });

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

  // don't delete this
  const getToken = async () => {
    try {
      const url = "http://35.220.218.52:3000/token/generate";
      const response = await fetch(url, {
        method: "POST",
      }).then((body) => body.json());

      // console.log(response.token);
      console.log("token received");
      Device.setup(response.token);
    } catch (err) {
      console.log(err);
      setInitError(true);
    }
  };

  // dummy function to shut react up
  if (incoming) {
    console.log(incoming);
  }

  useEffect(() => {
    // device init
    if (DEVMODE) {
      setDeviceReady(true);
    } else {
      getToken();
      Device.on("ready", () => {
        console.log("device ready");
        setDeviceReady(true);
      });
    }

    Device.on("error", (error) => {
      console.log("error log", error);
      setError(`An Error occurred, error code: ${error.code}`);
    });

    Device.on("disconnect", () => setConnection(false));

    Device.on("incoming", (conn) => {
      setIncoming(true);
      console.log(conn);
    });

    return () => {
      Device.destroy();
    };
  }, []);

  if (!deviceReady) {
    return (
      <>
        <Box
          flexGrow="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pb={4}
          pt={2}
        >
          {initError ? (
            <Box textAlign="center">
              <h4>Failed to connect to server</h4>
            </Box>
          ) : (
            <Box textAlign="center">
              <h4>Initializing Device, This could take a few sec</h4>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </>
    );
  } else {
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
        {error && (
          <Box textAlign="center">
            <h3>{error}</h3>
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
}

export default VoiceApp;
