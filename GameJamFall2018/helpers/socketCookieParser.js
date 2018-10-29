module.exports = function(socket, next) {

        let cookies = socket.handshake.headers.cookie.split(" ");
        //adding semicolon here is simpler then checking for it later because last one does not have one
        cookies[cookies.length - 1] += ";";
        let result = {};

        cookies.forEach(cookie => {

            let parts = cookie.split("=")
            result[parts[0]] = parts[1].substring(0,parts[1].length - 1);

        });

        socket.cookies = result;

    next();
}