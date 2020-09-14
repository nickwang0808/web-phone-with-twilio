const express = require("express");
const db = require("../config").db;
const arrayUnion = require("../config").arrayUnion;

const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

async function addMessageToDB(db, content, isIncoming, docID) {
  try {
    const doc = await db.collection("messages").doc(docID).get();
    if (doc && doc.exists) {
      await doc.ref.update({
        message: arrayUnion({
          // make a class object out of this vvvvv
          incoming: isIncoming,
          from: content.body.From,
          to: content.body.To,
          messageBody: content.body.Body,
          timeStamp: new Date(),
        }),
      });
    } else {
      await doc.ref.set({
        from: content.body.From,
        message: [
          {
            // convert this to class
            incoming: isIncoming,
            from: content.body.From,
            to: content.body.To,
            messageBody: content.body.Body,
            timeStamp: new Date(),
          },
        ],
      });
    }
  } catch (err) {
    console.log(err);
  }
}

router.post("/sms", (req, res) => {
  addMessageToDB(db, req, true, req.body.From);
  console.log({ header: req.header, body: req.body });
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
        addMessageToDB(db, req, false, req.body.To);
      })
      .then(res.sendStatus(200))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log({
      err: err,
      req: {
        header: req.eader,
        body: req.body,
      },
    });
  }
});

module.exports = router;
