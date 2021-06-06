var express = require('express');
var router = express.Router();

var firebase = require('firebase').default;
var log = require('log4js').getLogger();
/*
var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: '',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
};
*/
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/join', async(req, res, next) => {
    const { email, password } = req.body;
    try {
        var joinInfo = await firebase.auth().createUserWithEmailAndPassword(email, password);
        //await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
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