const express = require('express');
const router = express.Router();

//get:index.html
router.get("/index.html", (req, res) => {
    res.render("Home/index", res.user);
});

//get:index.html
router.get("/", (req, res) => {
    res.render("Home/index", res.user);
});

//get:about.html
router.get("/about.html", (req,res) => {
    res.render("Home/about", res.user);
});

module.exports = router;