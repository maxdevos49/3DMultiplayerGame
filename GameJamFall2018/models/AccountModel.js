//Require Mongoose
const mongoose = require('mongoose');

//Define schema class
const Schema = mongoose.Schema;

//new user schema
const AccountModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            type: String,
            default: ["user"]
        }
    ],
    status: {
        type: Boolean,
        default: true
    },
    highScore: {
        type: Number,
        default: 0
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    kills: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    UpdatedOn: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Account', AccountModel);