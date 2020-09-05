import React from "react";
import { makeStyles, InputBase, Box } from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    fontSize: "32px",
  },
  align: {
    textAlign: "center",
    fontSize: "32px",
    borderBottom: "2px solid #e6e6e6",
  },
});

function NumberBox({ dispatch, value }) {
  const classes = useStyles();
  return (
    <Box>
      <InputBase
        name="phoneNumber"
        onChange={(event) =>
          dispatch({ type: "match", payload: event.target.value })
        }
        value={value}
        fullWidth={true}
        autoFocus
        inputProps={{ className: classes.align }}
      />
    </Box>
  );
}

export default NumberBox;
