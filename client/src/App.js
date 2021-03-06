import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  AppBar,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import VoiceApp from "./components/voicecomp/voiceapp";
import SmsApp from "./components/smscomp/smsApp";
import { Phone, Chat } from "@material-ui/icons";
import { useFireStoreAllDocs } from "./components/hooks/useFirestore";
import useVoiceInit from "./components/hooks/useVoiceInit";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#e6e6e6",
  },
  appbar: {
    top: "auto",
    bottom: "0",
    maxWidth: "480px",
    // these 3 did the trick to center the app bar
    left: "0",
    right: "0",
    margin: "0px auto",
    // ^
  },
});

const DEVMODE = true;

export default function App() {
  const classes = useStyles();

  const { messages } = useFireStoreAllDocs("messages");

  const { deviceReady, initError, connectionError, incoming } = useVoiceInit(
    DEVMODE
  );

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
              <h4>
                Failed to connect to server, check yor internet and refresh the
                page
              </h4>
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
        <Router>
          <Switch>
            <Route exact path="/">
              <VoiceApp
                deviceReady={deviceReady}
                initError={initError}
                connectionError={connectionError}
                incoming={incoming}
                DEVMODE={DEVMODE}
              />
            </Route>
            <Route exact path="/text">
              <SmsApp messages={messages} />
            </Route>
          </Switch>
          <AppBar className={classes.appbar}>
            <BottomNavigation className={classes.root}>
              <BottomNavigationAction
                component={Link}
                to="/"
                icon={<Phone />}
              />
              <BottomNavigationAction
                component={Link}
                to="/text"
                icon={<Chat />}
              />
            </BottomNavigation>
          </AppBar>
        </Router>
      </>
    );
  }
}
