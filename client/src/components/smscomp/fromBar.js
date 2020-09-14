import React from "react";
import { Box, IconButton } from "@material-ui/core";
import { ArrowBack, MoreVert } from "@material-ui/icons";
export default function FromBar({ from, setNumToView }) {
  return (
    <>
      <Box
        height="56px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton onClick={() => setNumToView(null)}>
          <ArrowBack />
        </IconButton>
        <Box>{`From: ${from}`}</Box>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Box>
    </>
  );
}
