import React from "react";
import { Box, IconButton } from "@material-ui/core";
import { ArrowBack, MoreVert } from "@material-ui/icons";
export default function FromBar({ from }) {
  return (
    <>
      <Box
        height="56px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton>
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
