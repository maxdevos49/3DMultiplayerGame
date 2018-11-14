const express = require('express');
const router = express.Router();


//get:play.html
router.get("/play.html", (req, res) => {

    if(res.local.auth){
        res.render("Game/play",res.local);
    }else{
        res.redirect("/Account/login.html");
    }

});

//get:stats.html
router.get("/stats.html", (req, res) => {
    res.render("Game/stats", res.local);
});

//get:leaderboard.html
router.get("/leaderboard.html", (req, res) => {
    res.render("Game/leaderboard", res.local);
});



module.exports = router;