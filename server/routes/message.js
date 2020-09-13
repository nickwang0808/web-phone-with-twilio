const express = require("express");
const db = require("../config").db;
const timeStamp = require("../config").timeStamp;
const arrayUnion = require("../config").arrayUnion;

const router = express.Router();

async function addMessageToDB(db, content) {
  try {
    const docRef = db.collection("messages").doc(content.body.From);
    await docRef.update({
      message: arrayUnion({
        incoming: true,
        messageBody: content.body.Body,
        timeStamp: timeStamp(),
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

router.post("/sms", (req, res) => {
  addMessageToDB(db, req);
  console.log(req.body.Body);
  res.sendStatus(200);
});

module.exports = router;
