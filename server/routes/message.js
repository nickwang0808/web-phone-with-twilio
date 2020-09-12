const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const db = require("../config").db;
const timeStamp = require("../config").timeStamp;

const router = express.Router();

// async function addMessage(db, content) {
//   try {
//     const docRef = db.collection("messages").doc("test");
//     await docRef.set({
//       messageBody: content.body.Body,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

async function addMessage(db, content) {
  try {
    const docRef = db.collection("messages").doc("test");
    await docRef.set({
      messageBody: "testtest",
    });
  } catch (err) {
    console.log(err);
  }
}

router.post("/sms", (req, res) => {
  // add date to db
  addMessage(db, req);
  console.log(req.body.Body);
});

module.exports = router;
