const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const app1 = require("../app");

const api1 = functions.https.onRequest(app1);

module.exports = {
    api1
};