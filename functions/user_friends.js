const mongoose = require('mongoose');
const UserFriends = require('../models/user_friends');

var password = encodeURIComponent("swNaL6032g9S9mbx");
mongoose.connect('mongodb://admin:' + password + '@db-shard-00-00-azhaz.mongodb.net:27017,db-shard-00-01-azhaz.mongodb.net:27017,db-shard-00-02-azhaz.mongodb.net:27017/test?ssl=true&replicaSet=DB-shard-0&authSource=admin&retryWrites=true');

module.exports = {
  AddFriend: function (param,callback) {
     const returnVal = { status: 500 };
    const friend = UserFriends(
      {
        _id: mongoose.Types.ObjectId(),
        userid : param.userid,
        friendid : param.friendid,
        allowed: param.allowed  
      });
    friend.save()
    .then(result => {
      console.log(result);
      returnVal.status = 200;
      callback(returnVal);
    }).catch(err => {
      console.log(err)
      returnVal.status = 500;
      callback(returnVal);
    });
  },
  GetFriends: function (param) {  
    UserFriends.find({userid:param.userid}).exec()
    .then(result => {
        console.log(result);
        return result;
    }).catch(err => {
        console.log(err);
    })
  }
}