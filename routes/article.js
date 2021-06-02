var express = require('express');
var router = express.Router();
var firebase = require('firebase').default;
var functions = require('firebase-functions');
var log = functions.logger;

var config = {
    apiKey: "AIzaSyCEsUYmEz_qu9V8RSLjPKI3ZwRXn1lVKDQ",
    authDomain: "https://joonmohome.firebaseapp.com/",
    databaseURL: "https://joonmohome-default-rtdb.firebaseio.com/",
    projectId: "joonmohome",
    storageBucket: "gs://joonmohome.appspot.com",
    messagingSenderId: "407521114451"
};
firebase.initializeApp(config)
var db = firebase.firestore().collection('article');

/* GET home page. */
router.get('/', function(req, res, next) {
    return null;
});

router.post('/save', async(req, res, next) => {
    var { bno, title, content } = req.body;
    var boardData = { bno: "", title: title, content: content, status: "added", added: null, lastEdit: null };
    if (bno) {
        boardData.bno = bno;
        boardData.status = "edited";
        boardData.added = (await db.doc(bno).get()).data().added;
        boardData.lastEdit = Date.now();
        await db.doc(bno).update(boardData);
    } else {
        boardData.added = Date.now();
        var doc = db.doc();
        boardData.bno = doc.id;
        await doc.set(boardData);
    }
    res.json(boardData);
});




router.delete('/remove', async(req, res, next) => {
    if (!req.query.bno) res.json("bno is null");
    var deletedData;
    await (deletedData = db.doc(req.query.bno)).delete();
    res.json(deletedData);
})

module.exports = router;