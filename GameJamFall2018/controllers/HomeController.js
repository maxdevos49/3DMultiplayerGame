const express = require('express');
const router = express.Router();

//get:index.html
router.get("/index.html", (req, res) => {
    res.render("Home/index");
});

//get:index.html
router.get("/", (req, res) => {
    res.render("Home/index");
});

//get:about.html
router.get("/about.html", (req,res) => {
    res.render("Home/about");
});

module.exports = router;