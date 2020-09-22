const express = require("express");
const twilio = require("twilio");
const secrets = require("../secrets");
const router = express.Router();
const VoiceResponse = twilio.twiml.VoiceResponse;

const mynumber = secrets.TWILIO_PHONE_NUMBER;

router.post("/connect", (req, res) => {
  let voiceResponse = new VoiceResponse();
  voiceResponse.dial({ callerId: mynumber }, req.body.number);
  res.type("text/xml");
  // console.log("voiceResponse: ", voiceResponse);
  res.send(voiceResponse.toString());
});

module.exports = router;
