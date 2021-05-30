const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
<<<<<<< HEAD
//const express = require("../app")

const app1 = require("../app");

// app1.get("/", (request, response) => {
//   response.send("Hello from Express on Firebase!")
// });

const api1 = functions.https.onRequest(app1);

module.exports = {
  api1
}
=======
>>>>>>> fc0fb8a2a5c0368493153d35d8805d3d7ab26ad2
