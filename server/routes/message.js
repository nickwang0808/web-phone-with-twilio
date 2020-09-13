const express = require("express");
const db = require("../config").db;
const arrayUnion = require("../config").arrayUnion;

const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

async function addMessageToDB(db, content, isIncoming) {
  try {
    const docRef = db.collection("messages").doc(content.body.From);
    await docRef.update({
      message: arrayUnion({
        incoming: isIncoming,
        From: content.body.From,
        To: content.body.To,
        messageBody: content.body.Body,
        timeStamp: new Date(),
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

router.post("/sms", (req, res) => {
  addMessageToDB(db, req, true);
  console.log(req.body.Body);
  res.sendStatus(200);
});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// clean this up a bit to mimic the twilio http req
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
        addMessageToDB(db, req, false);
      })
      .then(res.sendStatus(200))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log({ err: err, req: req });
  }
});

module.exports = router;
