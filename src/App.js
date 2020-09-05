import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
} from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import VoiceApp from "./components/voiceapp";

export default function App() {
  return (
    <>
      <Container>
        <Box
          height={window.innerHeight + "px"}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Router>
            <Switch>
              <Route exact path="/">
                <VoiceApp />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/dash">
                <Dash />
              </Route>
            </Switch>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                component={Link}
                to="/"
                icon={<RestoreIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/about"
                icon={<RestoreIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/dash"
                icon={<RestoreIcon />}
              />
            </BottomNavigation>
          </Router>
        </Box>
      </Container>
    </>
  );
}

// function App() {
//   return <div>something</div>;
// }

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dash() {
  return (
    <div>
      <h2>Dash</h2>
    </div>
  );
}
