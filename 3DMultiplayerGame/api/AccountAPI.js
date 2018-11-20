const express = require('express');
const api = express.Router();

/**
 * GET:/api/Account/dashboard
 * 
 * responds with meta information about their profile and stats
 */
api.get("/dashboard", (req, res) => {
    res.json({ "Implemented": false });
});




module.exports = api;