//Require Mongoose
const mongoose = require('mongoose');

//Define schema class
const Schema = mongoose.Schema;

//new user schema
const ChatModel = new Schema({
    username: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "/images/gamepad.png"
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('chat', ChatModel);