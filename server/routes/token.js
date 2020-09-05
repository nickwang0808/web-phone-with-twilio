const express = require("express");
const router = express.Router();
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const accoundSid = "AC280fce702e8b475c7cda4592701bb7fa";
const apiKey = "SK6f824f245301cc3ef12c681de4130757";
const apiSecret = "I5TZkCyE9s3g6EqhSFMgpvROMddl0RtM";
const appSid = "APcc85c0402cde7a5d491f088920fc765c";

router.post("/generate", (req, res) => {
  // Used when generating any kind of tokens
  const twilioAccountSid = accoundSid;
  const twilioApiKey = apiKey;
  const twilioApiSecret = apiSecret;

  // Used specifically for creating Voice tokens
  const outgoingApplicationSid = appSid;
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
  // console.log(token.toJwt());
  console.log(token);
  res.append("Content-Type", "application/json");
  res.json({
    identity: identity,
    token: token,
  });
});

// router.post("/generate", (req, res) => {
// });

module.exports = router;
