const express = require('express');
const router = express.Router();
const permit = require("../middleware/permit.js");



//get:play.html
router.get("/play.html", permit(["user", "admin"], "/Account/login.html"),(req, res) => {
        res.render("Game/play",res.user);
});

//get:stats.html
router.get("/stats.html", (req, res) => {
    res.render("Game/stats", res.user);
});

//get:leaderboard.html
router.get("/leaderboard.html", (req, res) => {
    res.render("Game/leaderboard", res.user);
});



module.exports = router;