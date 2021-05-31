var express = require('express');
var router = express.Router();

var firebase = require('firebase')
var firebaseui = require('firebaseui');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/join',async(req,res,next)=>{

  const {email, password} = req.body;
  var joinInfo = await firebase.default.auth().createUserWithEmailAndPassword(email,password);
  res.json(joinInfo);
} )
module.exports = router;
