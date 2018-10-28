const express = require('express');
const router = express.Router();

//get:play.html
router.get("/play.html", (req, res) => {
    res.render("Game/play");
});

//get:stats.html
router.get("/stats.html", (req, res) => {
    res.render("Game/stats");
});

//get:leaderboard.html
router.get("/leaderboard.html", (req, res) => {
    res.render("Game/leaderboard");
});

module.exports = router;