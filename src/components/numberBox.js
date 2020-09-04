import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    borderWidth: "3px",
    borderColor: theme.palette.primary.main,
    // borderRadius: "px",
  },
}));

function NumberBox({ dispatch, value }) {
  const classes = useStyles();
  return (
    <>
      <TextField
        name="phoneNumber"
        onChange={(event) =>
          dispatch({ type: "match", payload: event.target.value })
        }
        value={value}
        autoFocus
        variant="outlined"
        color="primary"
        label="Number to Call"
        InputProps={{ classes: { notchedOutline: classes.root } }}
      />
    </>
  );
}

export default NumberBox;
