// this is for Voip setup, migrate back to main code when finished

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  CssBaseline,
  Button,
  Container,
  TextField,
  ButtonGroup,
} from "@material-ui/core";
import TopBar from "./components/topbar";
import NumberBox from "./components/numberBox";
import CallButton from "./components/callButton";
import KeyPad from "./components/keypad";
const { Device } = require("twilio-client");

function App() {
  const [deviceReady, setDeviceReady] = useState(false);
  const [connection, setConnection] = useState(false);
  const [number, setNumber] = useState("");
  const [incoming, setIncoming] = useState(false);

  const updateNumberToCall = (event) => {
    setNumber(event.target.value);
  };

  const handleHangUp = () => {
    Device.disconnectAll();
  };

  const handleMakeCall = () => {
    const params = { number: number };
    Device.connect(params);
  };

  const getToken = async () => {
    const response = await fetch("http://localhost:3000/token/generate", {
      method: "POST",
    }).then((body) => body.json());

    console.log(response.token);
    Device.setup(response.token);
  };
  // turn off init for now.
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
      <TopBar />
      <Container>
        <Box
          height="85vh"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          // pt={10}
        >
          <NumberBox updateNumber={updateNumberToCall} value={number} />

          <Grid item container direction="column" alignItems="center">
            <KeyPad />
          </Grid>

          <Grid item container direction="column" alignItems="center">
            <Grid item xs>
              <CallButton
                handleHangUp={handleHangUp}
                handleMakeCall={handleMakeCall}
                connection={connection}
                deviceReady={deviceReady}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
