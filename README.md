# Softphone powered by Twilio

### Make HD international Calls at affordable rates

## Main Features

- Make and receive calls anywhere in the world
- Super easy to use
- Any phone number you want
- Completely Web based, use anywhere, any device

## User Guide

### Server

- this app require a server to communicate with twilio platform.
- put all you keys and secrets in a .env file
- run `npm start` in server dir to spin up the server, then `ngrok http 3000` to get external links for the server
- update twilio twiml app in the console with the external link you took.

## TODO:

- ~~add hung up button~~
- ~~build main UI~~
- ~~add keypad~~
  - ~~use reducer to make keys functional~~
  - ~~add ui~~
- ~~add Device init process~~
- ~~cleaned up error handler~~
- ~~add react router~~
- ~~add texting~~
- ~~migrate to firebase function~~
  - ~~more code clean up.~~
- lift state to global
- implement redux
- add number validation
- add incoming call notification
- add incoming sms notification
- add fetch retry during init process

#### Notes:
