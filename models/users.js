const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    fullname : String,
    username : String,
    password:String,
    emailaddress:String,
    lastlogin : Date
});

module.exports = mongoose.model('Users',userSchema);