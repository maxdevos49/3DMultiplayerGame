const Token = require("./Token.js");

module.exports = (socket, next) => {

    let result;

    if (socket.cookies["WWW-Authenticate"]) {
        result = Token.tokenCheck(socket.cookies["WWW-Authenticate"]);
    } else {
        result = {"auth": false};
    }

    socket.decoded = result;
    next();
};
