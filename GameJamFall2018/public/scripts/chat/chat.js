let firstTime = true;

function chatInit(){

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

            chatBoard.innerHTML += `
            <div class="row"  style="padding: 0.2vh 1vh;">
                <div class="container">
                    <div class="row">
                        <img class="mr-2" src="/images/gamepad.png" alt="Generic placeholder image">
                        <small class="mt-2">${message.username}</small>
                    </div>
                    <div class="row">
                        <p class="mt-0 mb-1">${message.message}</p>
                    </div>
                </div>
            </div>
            <hr>`;
        });

        scrollToBottom();

    })

    /**
     * Add a new message that a user has sent
     */
    socket.on("addMessage", (message) => {
       
        let chatBoard = document.getElementById("chatBoard");
       
        chatBoard.innerHTML += `
        <div class="row"  style="padding: 0.2vh 1vh;">
            <div class="container">
                <div class="row">
                    <img class="mr-2" src="/images/gamepad.png" alt="Generic placeholder image">
                    <small class="mt-2">${message.username}</small>
                </div>
                <div class="row">
                    <p class="mt-0 mb-1">${message.message}</p>
                </div>
            </div>
        </div>
        <hr>`;

        scrollToBottom();
        
        
    });


}

function sendMessage(){
    let input = document.getElementById("input");

    socket.emit("newMessage", input.value);

    input.value = "";
}

function scrollToBottom(){

    let container = document.getElementById("scroll");

    container.scrollTop = container.scrollHeight;
      
}