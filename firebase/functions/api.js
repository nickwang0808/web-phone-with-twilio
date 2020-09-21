const express = require("express");
const cors = require("cors");

const token = require("./routes/token");
const call = require("./routes/call");
// got back to message1 when finished
const message = require("./routes/message2");

const api = express();
api.use(cors());

api.use("/token", token);
api.use("/call", call);
api.use("/sms", message);

module.exports = api;
