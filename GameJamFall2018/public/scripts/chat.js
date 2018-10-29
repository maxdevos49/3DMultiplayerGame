function chatInit(){

    

    socket.on("connect", () => {
        socket.emit("test", {"test": false});
    });

}