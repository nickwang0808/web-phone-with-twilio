import React from "react";
import SmsDetail from "./smsdetail";
import { Box } from "@material-ui/core";
import { useFireStoreAllDocs } from "./hooks/useFirestore";

function SmsPreview() {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <span>+13062323233</span>
          <span>sometngsometngsometngsometngsometng</span>
        </Box>
      </Box>
    </>
  );
}

export default function SmsApp() {
  const { messages, from } = useFireStoreAllDocs("messages");

  return (
    <>
      <SmsPreview />
    </>
  );
}
