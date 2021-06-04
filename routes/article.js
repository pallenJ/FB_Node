var express = require('express');
var router = express.Router();
var firebase = require('firebase').default;
var functions = require('firebase-functions');
var log = functions.logger;
var dateFormat = require('dateformat');
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



router.get('/list', async(req, res, next) => {
    var pg = req.query.pg || 2;
    var rows = req.query.rows || 3;
    var maxLength;
    var articleList = [];
    var articleTemp;
    try {
        var articleDB = db.orderBy('added', 'desc'); //작성일자기준 최신~오래된순 정렬
        maxLength = (await articleDB.get()).size;
        if ((pg - 1) * rows > maxLength) {
            res.json('page end'); //전체 페이지보다 현재 선택한 페이지*행의 개수가 많을때
        }
        var startData = (await articleDB.limitToLast(Math.max(pg - 1 * rows, 1)).get()).docs[0];
        if (pg * rows - 1 > maxLength) {
            rows = pg * rows - maxLength - 1; //선택한 페이지가 마지막 페이지일때
        }

        var pageList = await articleDB.startAfter(startData.id).limit(rows).get();
        pageList.forEach(_data => {
            articleTemp = _data.data();
            articleTemp.added = dateFormat(articleTemp.added, 'yyyy-mm-dd HH:MM:ss');
            articleTemp.edited = dateFormat(articleTemp.edited, 'yyyy-mm-dd HH:MM:ss'); //글쓴 날짜, 수정날짜 포맷 설정
            articleList.push(articleTemp);
        });
        res.json(articleList); //JSON으로 반환
    } catch (error) {
        res.json(error);
    }

    // db.orderBy('added', 'desc').get().then((ss) => {
    //     let rs = [];
    //     ss.docs.forEach(
    //         _e => {

    //             log.log(_e.data(), "/", typeof(_e));
    //             rs.push(_e.data())
    //         }
    //     );
    //     res.json(rs);
    // }).catch(err => res.render(err));

});

router.post('/save', async(req, res, next) => {
    let articleTemp = Article(req.body);
    let status = 'added';
    if (articleTemp.bno) {
        articleTemp.added = (await db.doc(articleTemp.bno).get()).data().added;
        articleTemp.edited = Date.now();
        await db.doc(articleTemp.bno).update(articleTemp);
        status = 'edited';
    } else {
        let doc = db.doc();
        articleTemp.bno = doc.id;
        await doc.set(articleTemp);
    }

    res.json({ article: articleTemp, status: status });
});


router.delete('/remove', async(req, res, next) => {
    if (!req.query.bno) res.json("bno is null");
    let deletedData;
    await (deletedData = db.doc(req.query.bno)).delete();
    res.json(deletedData);
})

module.exports = router;