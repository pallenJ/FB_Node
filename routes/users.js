var express = require('express');
var router = express.Router();

var firebase = require('firebase').default;
var log = require('log4js').getLogger();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/join', async(req, res, next) => {
    const { email, password } = req.body;
    try {
        var joinInfo = await firebase.auth().createUserWithEmailAndPassword(email, password);

        log.debug(ui.signIn());
        res.json(joinInfo);
    } catch (error) {
        res.json(error)
    }
})

router.get('/join', (req, res, next) => {

    res.render('users/join');
})
router.get('/login', (req, res, next) => {

    res.render('users/login');
})

module.exports = router;