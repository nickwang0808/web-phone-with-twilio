const express = require("express");
const twilio = require("twilio");
const router = express.Router();
const VoiceResponse = twilio.twiml.VoiceResponse;

//change this to env variable later
const mynumber = "+13069004564";

router.post("/connect", (req, res) => {
  let voiceResponse = new VoiceResponse();
  // console.log("dial: ", mynumber, req.body.number);
  voiceResponse.dial({ callerId: mynumber }, req.body.number);
  res.type("text/xml");
  console.log("voiceResponse: ", voiceResponse);
  res.send(voiceResponse.toString());
});

// router.get("/", (req, res) => {
//   res.send("this is call.js");
// });

module.exports = router;
