import React from "react";
import { makeStyles, InputBase, Box } from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    fontSize: "32px",
  },
  align: {
    textAlign: "center",
    fontSize: "32px",
    borderBottom: "1px solid grey",
  },
});

function NumberBox({ dispatch, value }) {
  const classes = useStyles();
  return (
    <Box mb={4}>
      <InputBase
        name="phoneNumber"
        onChange={(event) =>
          dispatch({ type: "match", payload: event.target.value })
        }
        value={value}
        autoFocus
        inputProps={{ className: classes.align }}
      />
    </Box>
  );
}

export default NumberBox;
