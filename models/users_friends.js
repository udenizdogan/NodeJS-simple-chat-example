const mongoose = require('mongoose');
const userfriendsSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userid : String,
    friendid : String,
    allowed : mongoose.Schema.Types.Boolean
});


module.exports = mongoose.model('UserFriends',userfriendsSchema);