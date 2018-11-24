const express = require('express');
const router = express.Router();
const permit = require("../middleware/permit.js");
const Shared = require("../helpers/Shared.js");
const AccountModel = require("../models/AccountModel.js");



//get:play.html
router.get("/play.html", permit(["user", "admin"], "/Account/login.html"),(req, res) => {
        res.render("Game/play", Shared.getModel(res));
});

//get:stats.html
router.get("/stats.html", (req, res) => {
    res.render("Game/stats", Shared.getModel(res));
});

//get:leaderboard.html
router.get("/leaderboard.html", (req, res) => {
    AccountModel.find({status: true}, function(err, data){
        if (err) throw err;
        res.render("Game/leaderboard", Shared.getModel(res, AccountModel, data));
    });
});



module.exports = router;