const mongoose = require('mongoose');
const Message = require('../models/messages');

var password = encodeURIComponent("swNaL6032g9S9mbx");
mongoose.connect('mongodb://admin:' + password + '@db-shard-00-00-azhaz.mongodb.net:27017,db-shard-00-01-azhaz.mongodb.net:27017,db-shard-00-02-azhaz.mongodb.net:27017/test?ssl=true&replicaSet=DB-shard-0&authSource=admin&retryWrites=true');

module.exports = {
  AddMessage: function (param) {
    const message = Message(
      {
        _id: mongoose.Types.ObjectId(),
        text : param.text,
        fromuserid : param.fromuserid,
        touserid:param.touserid  
      });
    message.save().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err)
    });
  },
  GetMessages: function (param) {  
    Message.find({ fromuserid: param.fromuserid , touserid:param.touserid})
    .exec()
    .then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    });
  }
}