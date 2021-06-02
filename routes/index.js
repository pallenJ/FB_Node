var express = require('express');
var router = express.Router();
var functions = require('firebase-functions');
var log = functions.logger;

/* GET home page. */
router.get('/', function(req, res, next) {
    log.debug('log test');
    res.render('index', { title: 'Express' });
});

module.exports = router;