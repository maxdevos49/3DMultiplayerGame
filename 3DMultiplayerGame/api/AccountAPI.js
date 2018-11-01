const express = require('express');
const api = express.Router();

const AccountModel = require("../models/AccountModel.js");
const Token = require("../helpers/Token.js");


/**
 * POST:/api/Account/login
 * 
 * responds with true if login succced or false otherwise
 */
api.post("/login", (req, res) => {

    let password = {};//for comparing
    let subUsername = req.body.username;
    password.p1 = req.body.password;

    AccountModel.findOne({username: subUsername}, "password", (err, result) => {
        if(err) throw err;

        if (!result) { 
            return res.redirect("/Account/login.html?validationError=" + encodeURIComponent("username:Username could not be identified!,password:Incorrect password!"));
        }else{

            password.p2 = result.password;
            let userAcount = new AccountModel({
                password: result.password
            });

            userAcount.comparePassword(password, (err, auth) => {
                if (!err) { 
                    return res.redirect("/Account/login.html?validationError=" + encodeURIComponent("username:Username could not be identified!,password:Incorrect password!")); 
                }else{

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
                    return res.redirect("/Account/dashboard.html");
                }
            })
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
    submission.password = (submission.password === submission.passwordCheck) ? submission.password : " ";

    let account = new AccountModel(submission);

    account.save((err) => {
        if (err) {
            res.redirect("/Account/register.html/?validationError=" + encodeURIComponent(err));
        }else{
            res.redirect("/Account/login.html");
        }
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