const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const router = express.Router();

router.post("/sms", (req, res) => {
  console.log(req.body.Body);
});

module.exports = router;
