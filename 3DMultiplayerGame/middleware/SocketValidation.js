const Shared= require("../helpers/Shared.js");

module.exports = (socket, next) => {

    let result;

    if (socket.cookies["WWW-Authenticate"]) {
        result = Shared.tokenCheck(socket.cookies["WWW-Authenticate"]);
    } else {
        result = {"auth": false};
    }

    socket.decoded = result;
    next();
};
