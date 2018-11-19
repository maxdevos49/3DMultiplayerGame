const express = require('express');
const api = express.Router();

const AccountModel = require("../models/AccountModel.js");
const Shared = require("../helpers/Shared.js");

/**
 * GET:/api/Account/dashboard
 * 
 * responds with meta information about their profile and stats
 */
api.get("/dashboard", (req, res) => {
    res.json({ "Implemented": false });
});




module.exports = api;