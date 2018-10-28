const express = require('express');
const api = express.Router();

const config = require("../config.js");

/**
 * GET:/api/Chat/login
 * 
 * responds with last 50 chat messages
 */
api.get("/messages", (req, res) => {
    res.json({"Implemented": false});
});

module.exports = api;
