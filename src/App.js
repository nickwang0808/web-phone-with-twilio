import React, { useState, useEffect, useReducer } from "react";

import {
  Box,
  Grid,
  CssBaseline,
  Container,
  CircularProgress,
} from "@material-ui/core";
import NumberBox from "./components/numberBox";
import KeyPad from "./components/keypad";
const { Device } = require("twilio-client");

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

function App() {
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
      const response = await fetch("http://localhost:3000/token/generate", {
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

  useEffect(() => {
    getToken();
    Device.on("ready", () => {
      console.log("device ready");
      setDeviceReady(true);
    });

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
        <CssBaseline />
        <Box
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
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
      <>
        <CssBaseline />
        <Container maxWidth="xs">
          <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            py={6}
          >
            <Box
              display="flex"
              flexGrow={1}
              flexDirection="column"
              justifyContent="space-between"
            >
              <NumberBox dispatch={dispatch} value={state.number} />

              <Box textAlign="center">
                <h3>{error}</h3>
              </Box>

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
          </Box>
        </Container>
      </>
    );
  }
}

export default App;
