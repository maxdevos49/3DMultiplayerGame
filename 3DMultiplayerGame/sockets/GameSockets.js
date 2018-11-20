module.exports = function(io){

    io.on('connection', (socket) => {
        if(socket.user.auth){
            // console.log(socket.user);


        }
    });

}