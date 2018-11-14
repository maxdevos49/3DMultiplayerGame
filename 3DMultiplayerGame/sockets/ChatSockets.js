let ChatModel = require("../models/ChatModel.js");
let Shared = require("../helpers/Shared.js");

module.exports = function(io){

    io.on('connection', (socket) => {
        if(socket.decoded.auth){

            /**
             * give client last 50 messages on new connection
             */
            ChatModel.find((err, chatData) => {
                if (err) throw err;

                chatData.reverse();
                socket.emit("messages", chatData);

            }).sort({_id:-1}).limit(50);


            /**
             * Recieve new message from client, save in 
             * db and then relay back to other users
             */
            socket.on("newMessage", (data) => {
                
                let message = {
                    username: socket.decoded.username,
                    message: Shared.escapeHtml(data),
                }

                let newMessage = new ChatModel(message)

                newMessage.save((err) => {
                    if (err) throw err;
                    io.emit("addMessage", message);
                });
            });

        }
    });
}