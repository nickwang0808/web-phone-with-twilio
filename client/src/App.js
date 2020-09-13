import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  AppBar,
  makeStyles,
} from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
// eslint-disable-next-line
import VoiceApp from "./components/voiceapp";
import SmsApp from "./components/smsapp";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e6e6e6",
  },
  appbar: {
    top: "auto",
    bottom: "0",
    maxWidth: "396px",
    // these 3 did the trick to center the app bar
    left: "0",
    right: "0",
    margin: "0px auto",
    // ^
  },
}));

export default function App() {
  const classes = useStyles();
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
                <SmsApp />
              </Route>
              <Route exact path="/dash">
                <Dash />
              </Route>
            </Switch>
            <AppBar className={classes.appbar}>
              <BottomNavigation className={classes.root}>
                <BottomNavigationAction
                  component={Link}
                  to="/"
                  icon={<RestoreIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to="/text"
                  icon={<RestoreIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to="/dash"
                  icon={<RestoreIcon />}
                />
              </BottomNavigation>
            </AppBar>
          </Router>
        </Box>
      </Container>
    </>
  );
}

function Dash() {
  return (
    <div>
      <h2>Dash</h2>
    </div>
  );
}
