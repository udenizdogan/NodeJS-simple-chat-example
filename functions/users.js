const mongoose = require('mongoose');
const Users = require('../models/users');
const UserFriends = require('../models/users_friends');
var bodyParser = require('body-parser');

var password = encodeURIComponent("swNaL6032g9S9mbx");
mongoose.connect('mongodb://admin:' + password + '@db-shard-00-00-azhaz.mongodb.net:27017,db-shard-00-01-azhaz.mongodb.net:27017,db-shard-00-02-azhaz.mongodb.net:27017/test?ssl=true&replicaSet=DB-shard-0&authSource=admin&retryWrites=true');

module.exports = {
  AddUser: function (param, callback) {
    const returnVal = { status: 500, user: {} };
    const user = Users(
      {
        _id: mongoose.Types.ObjectId(),
        fullname: param.fullname,
        username: param.username,
        password: param.password,
        emailaddress: param.emailaddress
      });
    user.save().then(result => {
      returnVal.user = result;
      returnVal.status = 200;
      console.log("createuser returnVal: " + returnVal);
      callback(returnVal);
    }).catch(err => {
      returnVal.user = {};
      returnVal.status = 404;
      callback(returnVal);
    });
  },
  Login: function (param, callback) {
    const returnVal = { status: 500, user: {} };
    const user = Users();
    Users.findOne({ username: param.username, password: param.password })
      .exec()
      .then(result => {
        if (result != null) {
          returnVal.user = result;
          returnVal.status = 200;
        }
        else {
          returnVal.user = {};
          returnVal.status = 404;
        }
        callback(returnVal);
      })
      .catch(err => {
        returnVal.user = user;
        returnVal.status = 500;
        console.log(err);
        callback(returnVal);
      })
  },
  Search: function (param, callback) {
    const returnVal = { status: 500, user: {} };
    Users.find({ $or: [{ 'username': new RegExp(param.searchtext, "i") }, { 'fullname': new RegExp(param.searchtext, "i") }, { 'emailaddress': new RegExp(param.searchtext, "i") }] })
      .exec()
      .then(result => {
        if (result != null) {
          returnVal.users = result;
          returnVal.status = 200;
        }
        else {
          returnVal.users = [];
          returnVal.status = 404;
        }
        callback(returnVal);
      })
      .catch(err => {
        returnVal.users = [];
        returnVal.status = 500;
        console.log(err);
        callback(returnVal);
      })
  },
  GetFriendRequest: function (param, callback) {
    const returnVal = { status: 500, users: [] };
    UserFriends.find({ 'userid': param.userid }).exec().then(result => {
      if (result != null) {
        const users_ids = [];
        result.forEach(user => {
          users_ids.push(mongoose.Types.ObjectId(user.friendid));
        });
        Users.find({ _id: { $in: users_ids } })
        .exec()
        .then(result => {
          if (result != null) {
            returnVal.users = result;
            returnVal.status = 200;
          }
          else {
            returnVal.users = [];
            returnVal.status = 404;
          }
          callback(returnVal);
        })
        .catch(err => {
          returnVal.users = [];
          returnVal.status = 500;
          console.log(err);
          callback(returnVal);
        })

      }
    }).catch(err => {
      console.log(err);
    });
    
    
  },
  AddFriend: function (param, callback) {
    const returnVal = { status: 500, description: '' };
    const friend = UserFriends(
      {
        _id: mongoose.Types.ObjectId(),
        userid: param.userid,
        friendid: param.friendid,
        allowed: param.allowed
      });
    friend.save()
      .then(result => {
        console.log(result);
        returnVal.status = 200;
        returnVal.description = 'Successful';
        callback(returnVal);
      }).catch(err => {
        console.log(err)
        returnVal.status = 500;
        returnVal.description = err;
        callback(returnVal);
      });
  },
  AcceptFriend: function (param, callback) {
    console.log("functions -> AcceptFriend : "+param.id);
    const returnVal = { status: 500, description: '' };
    try{    
    const friend = UserFriends();
    UserFriends.findOne({ _id: mongoose.Types.ObjectId(param.id) })
      .exec()
      .then(result => {
        if (result != null) {
          friend = result;
          console.log(result);
        }
        else
        {
          console.log("result == null");
        }
      })
      .catch(err => { console.log(err); })
    }
    catch(err)
    {
      console.log("Catch : " + err);
    }

    if (friend._id !== null) {
      friend.allowed = true;
      UserFriends.update({ _id: param.id }, friend, { upsert: true })
        .then(result => {
          console.log(result);
          returnVal.status = 200;
          returnVal.description = 'Successful';
          callback(returnVal);
        }).catch(err => {
          console.log(err)
          returnVal.status = 500;
          returnVal.description = err;
          callback(returnVal);
        });
    }
    else {
      returnVal.status = 500;
      returnVal.description = "Request not found";
      callback(returnVal);
    }
  },
  GetFriends: function (param) {
    UserFriends.find({ userid: param.userid }).exec()
      .then(result => {
        console.log(result);
        return result;
      }).catch(err => {
        console.log(err);
      })
  },
  OpenConversation: function (param, callback) {
    const returnVal = { status: 500, user: {}, messages: [] };
  }
}