const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//const express = require("../app")

const app1 = require("../app");

// app1.get("/", (request, response) => {
//   response.send("Hello from Express on Firebase!")
// });

const api1 = functions.https.onRequest(app1);

module.exports = {
  api1
}
