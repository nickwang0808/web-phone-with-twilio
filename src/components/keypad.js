import React from "react";
import { Button, ButtonGroup, Grid, Box } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

function KeyColumn({ value }) {
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
            <Button size="large" onClick={console.log("numkey clicked")}>
              {k}
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function KeyPad() {
  const keyValues = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return (
    <Grid
      item
      xs={12}
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={6}
    >
      {keyValues.map((kv) => (
        <KeyColumn value={kv} key={kv[0]} />
      ))}
    </Grid>
  );
}

export default KeyPad;
