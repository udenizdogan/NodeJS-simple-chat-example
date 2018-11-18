const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    text : String,
    fromuserid : String,
    touserid:String    
});

module.exports = mongoose.model('Message',messageSchema);