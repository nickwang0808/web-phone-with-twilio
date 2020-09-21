import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  AppBar,
  makeStyles,
} from "@material-ui/core";
import VoiceApp from "./components/voicecomp/voiceapp";
import SmsApp from "./components/smscomp/smsApp";
import { Phone, Chat } from "@material-ui/icons";
import { useFireStoreAllDocs } from "./components/hooks/useFirestore";

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

export default function App() {
  const classes = useStyles();

  const { messages } = useFireStoreAllDocs("messages");

  // useEffect(() => {
  //   async function fetchFBC() {
  //     const url =
  //       "https://us-central1-autodialer-285913.cloudfunctions.net/helloorld";
  //     const res = await fetch(url);
  //     console.log(res);
  //   }

  //   fetchFBC();
  // });

  return (
    <>
      <Container maxWidth="xs" disableGutters>
        <Box
          height={window.innerHeight + "px"}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          pb={7}
        >
          <Router>
            <Switch>
              <Route exact path="/">
                <VoiceApp />
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
        </Box>
      </Container>
    </>
  );
}
