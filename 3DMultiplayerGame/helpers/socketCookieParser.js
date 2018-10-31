module.exports = function(socket, next) {

        if (typeof(socket.handshake.headers.cookie) == "undefined") { next(); }
        if (socket.handshake.headers.cookie.length == 0){ next(); }

        let cookies = socket.handshake.headers.cookie.split(" ");
        //adding semicolon here is simpler then checking for it later because last one does not have one
        cookies[cookies.length - 1] += ";";
        let result = {};

        cookies.forEach(cookie => {

            let parts = cookie.split("=")
            result[parts[0].trim()] = (parts[1].substring(0,parts[1].length - 1)).trim();

        });

        socket.cookies = JSON.stringify(result);

    next();
}