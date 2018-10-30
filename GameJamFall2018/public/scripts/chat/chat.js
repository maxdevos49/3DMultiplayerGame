function chatInit(){
    /**
     * Event listener to listen for key press on the chat input
     */
    document.getElementById('input').onkeypress = (e) => {
        if(e.keyCode==13){
            sendMessage();
        }
    }

    /**
     * Add last 50 messages to the chat window here
     */
    socket.on("messages", (messages) => {
        
        let chatBoard = document.getElementById("chatBoard");

        messages.forEach(message => {

            chatBoard.innerHTML += constructChatMessage(message)
        });

        scrollToBottom();
    })

    /**
     * Add a new message that a user has sent
     */
    socket.on("addMessage", (message) => {
        
        let chatBoard = document.getElementById("chatBoard");
        chatBoard.innerHTML += constructChatMessage(message)

        scrollToBottom();
    });
}

/**
 * Sends a message after hitting enter in the chat input
 */
function sendMessage(){

    let input = document.getElementById("input");
    socket.emit("newMessage", input.value);
    input.value = "";

}

/**
 * Function to auto scroll the chat container
 */
function scrollToBottom(){

    let container = document.getElementById("scroll");
    container.scrollTop = container.scrollHeight;
      
}

/**
 * Function to construct the html for each chat
 */
function constructChatMessage(messageObject){

    let options = { hour: 'numeric', minute: 'numeric', weekday: 'long' };
    let date;

    if(messageObject.createdOn){
        date = new Date(Date.parse(messageObject.createdOn)).toLocaleDateString("en-US", options);
    }else{
        date = new Date(Date.now()).toLocaleDateString("en-US", options);
    }
    
    return (`
    <div class="row"  style="padding: 0.2vh 1vh;">
        <div class="container">
            <div class="row">
                <img class="mr-2" src="/images/gamepad.png" alt="Generic placeholder image">
                <small class="mt-2">${messageObject.username} - ${date}</small>
            </div>
            <div class="row">
                <p class="mt-0 mb-1">${messageObject.message}</p>
            </div>
        </div>
    </div>
    <hr>`);

}