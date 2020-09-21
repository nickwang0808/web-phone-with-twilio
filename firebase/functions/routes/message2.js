const express = require("express");
const db = require("../index").db;
const arrayUnion = require("../index").arrayUnion;
const secrets = require("../secrets");

const router = express.Router();

const accountSid = secrets.TWILIO_ACCOUNT_SID;
const authToken = secrets.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

async function addMessageToDB(db, content, isIncoming, docID) {
  console.log("addmessagetoDb");
  const messageDetailObj = {
    incoming: isIncoming,
    From: content.body.From,
    To: content.body.To,
    messageBody: content.body.messageBody,
    timeStamp: new Date(),
  };
  try {
    const doc = await db.collection("messages").doc(docID).get();
    console.log(doc);
    if (doc && doc.exists) {
      await doc.ref.update({
        isRead: isIncoming ? false : true,
        message: arrayUnion(messageDetailObj),
      });
    } else {
      // if doc does NOT exist, create one
      await doc.ref.set({
        from: content.body.From,
        isRead: isIncoming ? false : true,
        message: [messageDetailObj],
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("datebase update successful");
  }
}

// router.post("/receive", (req, res) => {
//   console.log({ header: req.header, body: req.body });
//   addMessageToDB(db, req, true, req.body.From);
//   res.status(200).end();
// });

router.post("/receive", async (req, res) => {
  console.log({ header: req.header, body: req.body });
  const docRef = db.collection("messages").doc(req.body.From);
  await docRef.set({ main: "something something" });
  res.sendStatus(200).end();
});

router.post("/send", (req, res) => {
  try {
    client.messages
      .create({
        body: req.body.Body,
        from: req.body.From,
        to: req.body.To,
      })
      .then((message) => {
        console.log(message.sid);
        addMessageToDB(db, req, false, req.body.To);
      })
      .then(res.sendStatus(200))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log({
      err: err,
      req: {
        header: req.header,
        body: req.body,
      },
    });
  }
});

module.exports = router;
