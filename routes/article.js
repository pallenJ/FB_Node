var express = require('express');
var router = express.Router();
var firebase = require('firebase').default;
var functions = require('firebase-functions');
var log = functions.logger;
var Article = require('../vo/Article') 
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
    var articleTemp = Article(req.body);
    var status = 'added';
    if(articleTemp.bno){
        articleTemp.added = (await db.doc(bno).get()).data().added;
        articleTemp.edited = Date.now();
        await db.doc(bno).update(articleTemp);
        status = 'edited';
    }
    else{
        var doc = db.doc();
        articleTemp.bno = doc.id;
        await doc.set(articleTemp);
    }

    res.json({article:articleTemp, status:status});
});


router.delete('/remove', async(req, res, next) => {
    if (!req.query.bno) res.json("bno is null");
    var deletedData;
    await (deletedData = db.doc(req.query.bno)).delete();
    res.json(deletedData);
})

module.exports = router;