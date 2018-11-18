var express = require('express');
var router = express.Router();
var userFunctions = require('../functions/users');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.cookies.user != null && req.cookies.user != undefined) {
    res.render('index', { title: 'Chat', user: req.cookies.user });
  }
  else {
    res.redirect('/login');
  }
});

router.get('/login', function (req, res, next) {
  res.clearCookie('user');
  res.render('login', { title: 'Chat' });
});

router.post('/login', function (req, res, next) {
  userFunctions.Login(req.body, function (returnVal) {
    if (returnVal.status == 200) {
      res.cookie('user', returnVal.user);
      res.redirect('/');
      res.end();
    }
    else {
      res.status(302).writeHead(302, {
        'Location': '/login'
      });
      res.end();
    }
  });
});

router.get('/createuser', function (req, res, next) {
  res.render('createuser', { title: 'Chat' });
});

router.post('/createuser', function (req, res, next) {
  userFunctions.AddUser(req.body, function (returnVal) {
    if (returnVal.status == 200) {
      res.cookie('user', returnVal.user);
      res.redirect('/');
      res.end();
    }
    else {
      res.status(302).writeHead(302, {
        'Location': '/createuser'
      });
      res.end();
    }
  });
});
module.exports = router;
