var express = require('express');
var router = express.Router();
var firebase = require('firebase').default;
var config = {
    apiKey: "AIzaSyCEsUYmEz_qu9V8RSLjPKI3ZwRXn1lVKDQ",
    authDomain: "https://joonmohome.firebaseapp.com/",
    databaseURL: "https://joonmohome-default-rtdb.firebaseio.com/",
    projectId: "joonmohome",
    storageBucket: "gs://joonmohome.appspot.com",
    messagingSenderId: "407521114451"
};
firebase.initializeApp(config)
var db = firebase.firestore().collection('board');

var log = require('log4js').getLogger();
/* GET home page. */
router.get('/', function(req, res, next) {});

router.post('/save', async(req, res, next) => {
    log.debug('asdfsdaf');
    var { title, content } = req.body;
    const boardData = { title: title, content: content };
    await db.add(boardData);
    res.json(boardData);
});


module.exports = router;