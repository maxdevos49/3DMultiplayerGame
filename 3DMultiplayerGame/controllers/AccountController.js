const express = require('express');
const router = express.Router();
const Shared = require("../helpers/Shared.js");
const AccountModel = require("../models/AccountModel.js");

/**
 * GET:/Account/register.html
 */
router.get("/register.html?:validationError", (req, res) => {
    //make middleware???
    res.local.valErr = Shared.JsonifyValididationError(req.query.validationError);
    
    if(!res.local.auth){//only allow if not logged in
        res.render("Account/register", res.local);
    }else{
        res.redirect("/");
    }
});

/**
 * GET:/Account/login.html
 */
router.get("/login.html?:validationError", (req, res) => {
    console.log(AccountModel.schema.obj);//bingo bango bongo the answer to all my questions <------
    res.local.valErr = Shared.JsonifyValididationError(req.query.validationError);

    if(!res.local.auth){//only allow if not logged in
        res.render("Account/login", res.local);
    }else{
        res.redirect("/");
    }

});

/**
 * GET:/Account/dashboard.html
 */
router.get("/dashboard.html?:validationError", (req, res) => {

    res.local.valErr = Shared.JsonifyValididationError(req.query.validationError);

    if(res.local.auth){//only allow if logged in
        res.render("Account/dashboard", res.local);
    }else{
        res.redirect("/Account/login.html");
    }

});

module.exports = router;