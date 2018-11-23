const express = require('express');
const router = express.Router();
const Shared = require("../helpers/Shared.js");

/**
 * GET:/index.html
 */
router.get("/index.html", (req, res) => {
    res.render("Home/index", Shared.getModel(res));
});

/**
 * GET:/index.html
 */
router.get("/", (req, res) => {
    res.render("Home/index", Shared.getModel(res));
});

/**
 * GET:/about.html
 */
router.get("/about.html", (req,res) => {
    res.render("Home/about", Shared.getModel(res));
});

module.exports = router;