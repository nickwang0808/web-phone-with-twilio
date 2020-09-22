const express = require("express");
const cors = require("cors");

const token = require("./routes/token");
const call = require("./routes/call");
const message = require("./routes/message");

const api = express();
api.use(cors());

api.use("/token", token);
api.use("/call", call);
api.use("/sms", message);

module.exports = api;
