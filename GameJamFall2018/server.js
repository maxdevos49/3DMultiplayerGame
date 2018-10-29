const express = require('express');
const app = express();
const http = require('http');
const ip = require('ip');
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;
const routes = require('./routes.js');

//view engine
app.set('view engine', 'vash');
app.set('views', __dirname + '/views');

//set the routes for the server to use
app.use('/', routes(io));

//start the server
server.listen(PORT, function () {
    console.log(`Web Development Club running at ${ip.address()}:${PORT}`);
});
