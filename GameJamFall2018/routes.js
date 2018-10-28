const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//middleware
const validation = require("./helpers/Validation.js");

//config settings
const config = require('./config.js');

//include document routes
const ROUTES_home = require("./controllers/HomeController.js");
const ROUTES_game = require("./controllers/GameController.js");
const ROUTES_account = require("./controllers/AccountController.js");

//include api routes
const API_index = require('./api/IndexAPI.js');
const API_account = require('./api/AccountAPI.js');
const API_chat = require('./api/ChatAPI.js');

//connect to the database using Mongoose
mongoose.connect(config.dbUrl, { useNewUrlParser: true });

//middleware
router.use(cookieParser());
router.use(express.static('GameJamFall2018/public'));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(validation);

//document routes
router.use('/', ROUTES_home);
router.use('/Game', ROUTES_game);
router.use('/Account', ROUTES_account);

//api routes
router.use('/api', API_index);
router.use('/api/Account', API_account);
router.use('/api/Chat', API_chat);

//respond with a 404 api request if nothing was found
router.use('/api', (req, res) => {
    res.status(404);
    res.json({ "error": "Bad request!" });
});

//respond with a 404 request if the document was not found
router.use('/', (req, res) => {
    res.status(404);
    res.render("shared/404");
});

module.exports = router;