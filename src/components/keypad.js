import React from "react";
import { Button, Grid, Box } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import CallButton from "./callButton";

function KeyColumn({ value, dispatch }) {
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
  deviceReady,
  dispatch,
}) {
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
      <Grid item xs>
        <CallButton />
      </Grid>
    </Grid>
  );
}

export default KeyPad;