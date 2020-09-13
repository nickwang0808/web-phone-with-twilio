const admin = require("firebase-admin");
const serviceAccount = require("./autodialer-285913-firebase-adminsdk-vk2kb-a26ac625f7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://autodialer-285913.firebaseio.com",
});

const db = admin.firestore();
const timeStamp = admin.firestore.FieldValue.serverTimestamp;
const arrayUnion = admin.firestore.FieldValue.arrayUnion;

module.exports.db = db;
module.exports.timeStamp = timeStamp;
module.exports.arrayUnion = arrayUnion;
