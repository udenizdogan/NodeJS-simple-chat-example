var express = require('express');
var router = express.Router();
var userFunctions = require('../functions/users');
var cookieParser = require('cookie-parser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/search', function(req, res, next) {
  userFunctions.Search(req.body, function (returnVal) {
    if (returnVal.status == 200) {
      res.send(returnVal.users);
      res.end();
    }
    else
    {
      res.send([]);
      res.end();
    }
  });
});

router.post('/getfriendrequest', function(req, res, next) {
  var data = {}
  data.userid = req.cookies.user._id;
  console.log(data);
  userFunctions.GetFriendRequest(data, function (returnVal) {
    if (returnVal.status == 200) {
      res.send(returnVal.users);
      res.end();
    }
    else
    {
      res.send([]);
      res.end();
    }
  });
});

router.post('/addfriend', function(req, res, next) {  
  req.body.userid = req.cookies.user._id;
  userFunctions.AddFriend(req.body, function (returnVal) {
    if (returnVal.status == 200) {
      res.send(returnVal);
      res.end();
    }
    else
    {
      res.send(returnVal);
      res.end();
    }
  });
});

router.post('/acceptfriend', function(req, res, next) {  
  console.log("routes -> acceptfriend");
  //req.body.userid = req.cookies.user._id;
  userFunctions.AcceptFriend(req.body, function (returnVal) {
    if (returnVal.status == 200) {
      res.send(returnVal);
      res.end();
    }
    else
    {
      res.send(returnVal);
      res.end();
    }
  });
});


module.exports = router;
