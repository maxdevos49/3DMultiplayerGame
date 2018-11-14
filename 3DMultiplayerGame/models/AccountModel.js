const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Shared = require("../helpers/Shared.js");

const AccountModel = new Schema({
    username: {
        key: "username",
        name: "Username",
        type: String,
        minlength: [3, "Username must contain atleast 3 characters."],
        required: [true, "Username is required!"]
    },
    password: {
        key: "password",
        name: "Password",
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

/**
 * Virtual property used for comparing passwords upon registration
 */
AccountModel.virtual('passwordConfirmation').key = "passwordConfirmation";
AccountModel.virtual('passwordConfirmation').name = "Password Confirmation";
AccountModel.virtual('passwordConfirmation')
    .get(function () {
        return this._passwordConfirmation;
    })
    .set(function (value) {
        this._passwordConfirmation = value;
    });


/**
 * checks upon registering if the two passwords match
 */
AccountModel.pre('validate', function (next) {
    if (this.password !== this.passwordConfirmation) {
        this.invalidate('passwordConfirmation', 'Please enter the same password!');
        next();
    }

    this.constructor.find({ username: this.username }, (err, docs) => {
        if (err) throw err;
        if (docs.length > 0) {
            this.invalidate('username', 'Username is taken!');
        }
        next();
    });
});

/**
 * Hashes the password and modifies any needed properties after validation is successful
 */
AccountModel.post('validate', (doc, next) => {
    doc.password = Shared.hashString(doc.password);
    doc.roles = ["user"]
    next();
});

/**
 * Checks if the username and password is correct
 */
AccountModel.statics.ValidateLogin = function (username, password, callback) {

    this.findOne({ username: username }, "password", function (err, data) {
        if (err) throw err;
        if(!data){
            return callback(true);
        }
        if (Shared.compareHash(password, data.password)) {
            return callback(null);
        } else {
            return callback(true);
        }
    });
}

/**
 * Concatenates the schema onto the local response property
 */
AccountModel.statics.GetModel = function (data) {
    let result = AccountModel.tree;
    result.valErr = data.valErr;
    result.auth = data.auth;
    return result;
}

module.exports = mongoose.model('Account', AccountModel);