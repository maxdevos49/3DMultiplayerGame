const express = require('express');
const router = express.Router();
const Shared = require("../helpers/Shared.js");

/**
 * GET:/Account/register.html
 */
router.get("/register.html?:validationError", (req, res) => {
    
    let valErr = req.query.validationError;
    if (typeof(valErr) != "undefined"){
        res.local.valErr = Shared.JsonifyValididationError(decodeURIComponent(valErr));
    }
    
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

    let valErr = req.query.validationError;
    if (typeof (valErr) != "undefined") {
        res.local.valErr = Shared.JsonifyValididationError(decodeURIComponent(valErr));
    }

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

    let valErr = req.query.validationError;
    if (typeof (valErr) != "undefined") {
        res.local.valErr = Shared.JsonifyValididationError(decodeURIComponent(valErr));
    }

    if(res.local.auth){//only allow if logged in
        res.render("Account/dashboard", res.local);
    }else{
        res.redirect("/Account/login.html");
    }

});

module.exports = router;