import React from "react";
import { TextField } from "@material-ui/core";

function NumberBox({ updateNumber, value }) {
  return (
    <>
      <TextField
        name="phoneNumber"
        onChange={updateNumber}
        value={value}
        variant="outlined"
        color="primary"
        label="Input Number Here"
      />
    </>
  );
}

export default NumberBox;
