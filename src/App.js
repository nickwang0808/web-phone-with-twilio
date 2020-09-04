import React, { useState, useEffect, useReducer } from "react";

import { Box, Grid, CssBaseline, Container } from "@material-ui/core";
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
  const [connection, setConnection] = useState(false);
  const [incoming, setIncoming] = useState(false);

  const [state, dispatch] = useReducer(reducer, { number: "" });

  const handleHangUp = () => {
    Device.disconnectAll();
  };

  const handleMakeCall = () => {
    const params = { number: state.number };

    // const params = { number: number };
    Device.connect(params);
  };

  // don't delete this
  const getToken = async () => {
    const response = await fetch("http://localhost:3000/token/generate", {
      method: "POST",
    }).then((body) => body.json());

    console.log(response.token);
    Device.setup(response.token);
  };
  // // turn off init for now.
  // useEffect(() => {
  //   getToken();
  //   Device.on("ready", () => {
  //     console.log("device ready");
  //     setDeviceReady(true);
  //   });
  //  // do i need [] here?
  // },[]);

  useEffect(() => {
    // I have no clue what I'm doing here. just wanna clean up some eventListeners
    const handleAnswerCall = (conn) => {
      setIncoming(true);
      console.log(conn);
    };
    Device.on("incoming", (conn) => handleAnswerCall(conn));

    return () => {
      Device.removeListener("incoming", (conn) => handleAnswerCall(conn));
    };
  }, []);

  useEffect(() => {
    Device.on("error", (error) => console.log(error));
  });

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

            <Grid item container direction="column" alignItems="center">
              <KeyPad
                handleHangUp={handleHangUp}
                handleMakeCall={handleMakeCall}
                connection={connection}
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

export default App;
