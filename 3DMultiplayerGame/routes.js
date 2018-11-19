const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//middleware
const validation = require("./middleware/Validation.js");
const socketValidation = require("./middleware/SocketValidation.js");
const socketCookieParser = require("./middleware/socketCookieParser.js");

//config settings
const config = require('./config.js');

//include document routes
const ROUTES_home = require("./controllers/HomeController.js");
const ROUTES_game = require("./controllers/GameController.js");
const ROUTES_account = require("./controllers/AccountController.js");

//include api routes
const API_account = require('./api/AccountAPI.js');
const API_index = require('./api/IndexAPI.js');
const API_chat = require('./api/ChatAPI.js');

const SOCKET_chat = require('./sockets/ChatSockets.js');
const SOCKET_game = require('./sockets/GameSockets.js');

module.exports = function(io){

//connect to the database using Mongoose
mongoose.connect(config.dbUrl, { useNewUrlParser: true });

//middleware for express
router.use(cookieParser());
router.use(express.static('3DMultiplayerGame/public'));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(validation);

//middleware for socket.io
io.use(socketCookieParser);
io.use(socketValidation);

//socket routes
io.use(SOCKET_chat(io));
io.use(SOCKET_game(io));

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

return router;

}