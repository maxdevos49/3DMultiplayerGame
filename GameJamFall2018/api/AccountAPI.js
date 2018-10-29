const express = require('express');
const api = express.Router();

const AccountModel = require("../models/AccountModel.js");
const Token = require("../helpers/Token.js");
const Hash = require("../helpers/Hash.js");

const config = require("../config.js");

/**
 * POST:/api/Account/login
 * 
 * responds with true if login succced or false otherwise
 */
api.post("/login", (req, res) => {

    let subUsername = req.body.username.toLowerCase();
    let subPassword = req.body.password;

    AccountModel.findOne({username: subUsername}, "password", (err, result) => {

        if(result){
            if (Hash.compareHash(subPassword, result.password)) {

                let payload = {
                    auth: true,
                    username: subUsername,
                    exp: (Math.floor(Date.now() / 1000) + 60) * 24
                };

                let token = Token.tokenGen(payload)

                res.cookie("WWW-Authenticate", token, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true
                });

                res.redirect("/Account/dashboard.html");
            }else{
                res.redirect("/Account/login.html");
            }
        } else{
            res.redirect("/Account/login.html");  
        }
    });
});

/**
 * POST:/api/Account/register
 * 
 * responds with true if successful or an error
 */
api.post("/register", (req, res) => {

    let submission = req.body;

    //check if passwords match
    if(submission.password == submission.passwordCheck && submission.password.length > 8 && submission.password.length < 55){
        submission.password = Hash.hashString(submission.password);
    }else {
        submission.password = null;
    }

    AccountModel.find({username: submission.username.toLowerCase()},(err, result) => {//check for duplicate user
        
        if(result.length > 0){
            submission.username = null;
        }else{
            submission.username = submission.username.toLowerCase();
        }

        let account = new AccountModel(req.body);

        account.save((err) => {
            if (err) {
                res.local.err = err;
                res.redirect("/Account/register.html");
            }else{
                res.redirect("/Account/login.html");
            }
        });
    });
});

/**
 * GET:/api/Account/logout
 * 
 * responds with a true if logout was successful
 */
api.get("/logout", (req, res) => {
    res.clearCookie("WWW-Authenticate");
    res.redirect("/");
});

/**
 * GET:/api/Account/dashboard
 * 
 * responds with meta information about their profile and stats
 */
api.get("/dashboard", (req, res) => {
    res.json({"Implemented": false});
});




module.exports = api;