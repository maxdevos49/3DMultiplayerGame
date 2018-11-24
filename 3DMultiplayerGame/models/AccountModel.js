const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Shared = require("../helpers/Shared.js");

const AccountModel = new Schema({
    username: {
        display: "Username",
        type: String,
        validate: [/^[A-Za-z0-9_]+$/, "Username can only contain alphanumeric characters and underscores!"],
        minlength: 3,
        maxlength: 20,
        required: true
    },
    password: {
        type: String,
        display: "Password",
        minlength: 8,
        maxlength: 50,
        required: true
    },
    role: {
        type: String,
        display: "Role",
        default: "user"
    },
    status: {
        type: Boolean,
        display: "Status",
        default: true
    },
    highScore: {
        type: Number,
        display: "High Score",
        default: 0
    },
    createdOn: {
        type: Date,
        display: "Created On",
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        display: "Updated On",
        default: Date.now()
    }

});

/**
 * Virtual property used for comparing passwords upon registration
 */
AccountModel.virtual('passwordConfirmation').display = "Password Confirmation";
AccountModel.virtual('passwordConfirmation').matches = "password";

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
        if (!data) {

            return callback({ error: { username: { properties: { message: "Username is unknown!" } } } });
        }
        if (Shared.compareHash(password, data.password)) {
            return callback(null);
        } else {
            return callback({ error: { password: { properties: { message: "Password is incorrect!" } } } });
        }
    });
}

module.exports = mongoose.model('Account', AccountModel);