//Require Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hash = require('../helpers/Hash.js');

//new user schema
const AccountModel = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    password: {
        type: String,
        min: [9, "Password must contain atleast 9 characters and 1 special character"],
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

AccountModel.pre('save', (next) => {
    let user = this;
    user.password = Hash.hashString(user.password);
    next();
});

AccountModel.methods.comparePassword = (candidatePassword, cb) => {
    let auth = Hash.compareHash(candidatePassword, this.password);
    if(err){
        cb(err);
    }else{
        cb(null,auth);
    }

};

module.exports = mongoose.model('Account', AccountModel);