const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Shared = require("../helpers/Shared.js");

const AccountModel = new Schema({
    username: {
        display: "Username",
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    password: {
        display: "Password",
        type: String,
        minlength: 8,
        maxlength: 50,
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
            
            return callback({error: {username: {properties: {message: "Username is unknown!"}}}});
        }
        if (Shared.compareHash(password, data.password)) {
            return callback(null);
        } else {
            return callback({error: {password: {properties: {message: "Password is incorrect!"}}}});
        }
    });
}

/**
 * Combines the Model, Authorization and the validationError objects into one for the view to use
 */
AccountModel.statics.GetModel = function (req, res) {

    let model = {};

    for (let key in AccountModel.tree) {

        //add path
        AccountModel.tree[key].path = key;
        
        //add any previous data or validation errors
        if (AccountModel.tree[key]) {

            //values
            AccountModel.tree[key].value = req.body[key] || "";

            //errors
            if (res.user.error && res.user.error[key]) {
                AccountModel.tree[key].error = res.user.error[key].properties.message;
                res.user.error[key].properties.message = "";
            }
        }
    }

    Object.assign(model, AccountModel.tree, res.user)

    return model;
}

module.exports = mongoose.model('Account', AccountModel);