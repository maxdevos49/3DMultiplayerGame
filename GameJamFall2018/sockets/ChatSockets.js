module.exports = function(io){

    io.on('connection', (socket) => {
        if(socket.decoded.auth){
            console.log("Chat socket!")
        }
    });
}