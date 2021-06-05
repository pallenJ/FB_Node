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
        let articleDB = db.orderBy('added', 'desc'); //작성일자기준 최신~오래된순 정렬
        maxLength = (await articleDB.get()).size;

        if ((pg - 1) * rows > maxLength || maxLength == 0) {
            res.json('page end'); //전체 페이지보다 현재 선택한 페이지*행의 개수가 많을때
        }
        let startData = (await articleDB.limit(Math.max((pg - 1) * rows, 1)).get()).docs.reverse()[0];
        if (pg * rows > maxLength && (rows = maxLength - (pg - 1) * rows) == 0) {
            res.json('page end'); //전체 페이지보다 현재 선택한 페이지*행의 개수가 많을때
        }
        let pageList = await (pg == 1 ? articleDB.startAt(startData) : articleDB.startAfter(startData)).limit(rows).get();;

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

});


router.get('/:bno', async(req, res, next) => {
    try {
        let articleData = (await db.doc(req.params.bno).get()).data();
        articleData.added = dateFormat(articleData.added, 'yyyy-mm-dd HH:MM:ss');
        articleData.edited = dateFormat(articleData.edited, 'yyyy-mm-dd HH:MM:ss');
        res.json(articleData)
    } catch (error) {
        res.json(error)
    }
});



router.post('/save', async(req, res, next) => {
    try {
        let articleTemp = Article(req.body); // request에서 값을 가져옴
        let status = 'added';
        if (articleTemp.bno) { //보낸값에 bno가 있는 경우(이미 존재하는 글을 수정할 경우)
            let edittemp;
            if ((edittemp = await db.where('bno', '==', articleTemp.bno).get()).size == 0) //글이  존재하는지체크
                res.json({ error: 'article is not exist' })
            edittemp = edittemp.docs[0];
            articleTemp.added = edittemp.data().added;
            articleTemp.edited = Date.now();
            await db.doc(articleTemp.bno).update(articleTemp);
            status = 'edited';
        } else { //새로운 글을 추가할경우
            let doc = db.doc();
            articleTemp.bno = doc.id;
            await doc.set(articleTemp);
        }
        res.json({ article: articleTemp, status: status });

    } catch (error) {
        res.json(error);
    }
});


router.delete('/remove', async(req, res, next) => {
    try {

        if (!req.query.bno) res.json("bno is null");
        let deletedData;
        await (deletedData = db.doc(req.query.bno)).delete();
        res.json(deletedData);
    } catch (error) {
        res.json(error);
    }
})



module.exports = router;