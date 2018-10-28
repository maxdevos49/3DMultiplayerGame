const express = require('express');
const router = express.Router();

//get:register.html
router.get("/register.html", (req, res) => {
    
    if(!res.local.auth){//only allow if not logged in
        res.render("Account/register", res.local);
    }else{
        res.redirect("/");
    }

});

//get:login.html
router.get("/login.html", (req, res) => {

    if(!res.local.auth){//only allow if not logged in
        res.render("Account/login", res.local);
    }else{
        res.redirect("/");
    }

});

//get:dashboard.html
router.get("/dashboard.html", (req, res) => {

    if(res.local.auth){//only allow if logged in
        res.render("Account/dashboard", res.local);
    }else{
        res.redirect("/Account/login.html");
    }

});

module.exports = router;