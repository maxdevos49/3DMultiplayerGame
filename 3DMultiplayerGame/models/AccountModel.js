const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Hash = require("../helpers/Hash.js");


//new user schema
const AccountModel = new Schema({
    username: {
        type: String,
        minlength: [3, "Username must contain atleast 3 characters."],
        required: [true, "Username is required!"]
    },
    password: {
        type: String,
        minlength: [9, "Password must contain atleast 9 characters and 1 special character."],
        required: [true, "Password is required!"]
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
    createdOn: {
        type: Date,
        default: Date.now()
    },
    UpdatedOn: {
        type: Date,
        default: Date.now()
    }

});

AccountModel.post('validate', (doc, next) => {

    doc.password = Hash.hashString(doc.password);
    doc.roles = ["user"]

    next();
});

AccountModel.methods.comparePassword = (passwords, cb) => {
    bcrypt.compare(passwords.p1, passwords.p2, (err, isMatch) => {
        if (!err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Account', AccountModel);