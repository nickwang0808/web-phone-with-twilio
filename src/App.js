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
import { Height } from "@material-ui/icons";
const { Device } = require("twilio-client");

function App() {
  const [deviceReady, setDeviceReady] = useState(false);
  const [connection, setConnection] = useState(false);
  const [number, setNumber] = useState("");

  const updateNumber = (event) => {
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
  // });

  useEffect(() => {
    Device.on("error", (error) => console.log(error));
  });

  return (
    <>
      <CssBaseline />
      <TopBar />
      <Container>
        <Box
          height="90vh"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <div />

          <NumberBox updateNumber={updateNumber} value={number} />

          <Grid container direction="column" alignItems="center">
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
