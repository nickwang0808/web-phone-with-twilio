const express = require("express");
const router = express.Router();
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const secrets = require("../secrets");

router.post("/", (req, res) => {
  // Used when generating any kind of tokens

  const twilioAccountSid = secrets.TWILIO_ACCOUNT_SID;
  const twilioApiKey = secrets.API_KEY;
  const twilioApiSecret = secrets.API_SECRET;

  // Used specifically for creating Voice tokens
  const outgoingApplicationSid = secrets.TWILIO_APP_SID;
  const identity = "user";

  // Create a "grant" which enables a client to use Voice as a given user
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: outgoingApplicationSid,
    incomingAllow: true, // Optional: add to allow incoming calls
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  let token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
    identity: identity,
  });
  token.addGrant(voiceGrant);
  token = token.toJwt();

  // Serialize the token to a JWT string
  // console.log(token);
  // token && console.log("-----token sent-----");
  res.append("Content-Type", "application/json");
  res.json({
    identity: identity,
    token: token,
  });
  res.status(200).end();
});

module.exports = router;
