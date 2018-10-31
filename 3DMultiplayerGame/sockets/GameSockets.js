module.exports = function(io){

    io.on('connection', (socket) => {

        

        if(socket.decoded.auth){
            console.log(`Game socket for ${socket.decoded.username}!`)
            //everything goes here

        }
    });

}