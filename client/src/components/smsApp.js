import React, { useState } from "react";
import SmsDetail from "./smsdetail";
import { Box } from "@material-ui/core";
import { useFireStoreAllDocs } from "./hooks/useFirestore";
import List from "@material-ui/core/List";
import SmsPreview from "./smscomp/smspreview";

export default function SmsApp() {
  const { messages } = useFireStoreAllDocs("messages");
  const [numToView, setNumToView] = useState(null);

  if (!numToView) {
    return (
      <>
        <Box pl={1} overflow="auto">
          <List>
            {messages.map((message) => {
              let [
                day,
                month,
                year,
              ] = message.timeStamp.toDate().toLocaleDateString().split("/");
              return (
                <SmsPreview
                  onClick={() => setNumToView(message.from)}
                  time={{ day, month, year }}
                  key={message.timeStamp}
                  from={message.from}
                  isRead={message.isRead}
                  content={message.messageBody}
                />
              );
            })}
          </List>
        </Box>
      </>
    );
  } else {
    return <SmsDetail numToView={numToView} setNumToView={setNumToView} />;
  }
}
