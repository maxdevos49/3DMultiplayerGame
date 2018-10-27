const express = require('express');
const router = express.Router();

router.get("/index.html", (req, res) => {
    res.render("Home/index");
});


router.get("/", (req, res) => {
    res.render("Home/index");
});

module.exports = router;