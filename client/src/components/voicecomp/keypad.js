import React from "react";
import { Button, Grid, Box, makeStyles } from "@material-ui/core";
import CallButton from "./callButton";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "64px",
    fontSize: "24px",
  },
  callBox: {
    marginTop: theme.spacing(2),
  },
}));

function KeyColumn({ value, dispatch }) {
  const classes = useStyles();
  return (
    <Grid
      item
      xs
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      {value.map((k) => (
        <Grid item xs key={k}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              className={classes.root}
              fullWidth
              size="large"
              onClick={() => dispatch({ type: "add", payload: k })}
            >
              {k}
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function KeyPad({
  handleHangUp,
  handleMakeCall,
  connection,
  setConnection,
  dispatch,
}) {
  const classes = useStyles();

  const keyValues = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["*", 0, "#"],
  ];

  return (
    <Grid
      item
      xs={12}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      {keyValues.map((kv) => (
        <KeyColumn value={kv} dispatch={dispatch} key={kv[0]} />
      ))}

      {/* keeping it like it is not gonna make it more clean */}
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.callBox}
      >
        <Grid item xs>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button fullWidth size="large">
              {/* Show */}
            </Button>
          </Box>
        </Grid>

        <Grid item xs>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CallButton
              handleHangUp={handleHangUp}
              handleMakeCall={handleMakeCall}
              connection={connection}
            />
          </Box>
        </Grid>

        <Grid item xs>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => dispatch({ type: "del" })}
              fullWidth
              size="large"
            >
              DEL
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default KeyPad;
