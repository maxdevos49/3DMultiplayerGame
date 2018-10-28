const express = require('express');
const router = express.Router();

//get:register.html
router.get("/register.html", (req, res) => {
    res.render("Account/register");
});

//get:login.html
router.get("/login.html", (req, res) => {
    res.render("Account/login");
});

//get:dashboard.html
router.get("/dashboard.html", (req, res) => {
    res.render("Account/dashboard");
});

module.exports = router;