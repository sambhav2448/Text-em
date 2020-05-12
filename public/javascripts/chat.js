//make connection

var socket = io();

//query dom
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback=document.getElementById('feedback');


//func
function iof(){
    socket.emit("chat",{
        message:message.value,
        handle:handle.value
    });
}

//emit events

btn.addEventListener("click",function(){
    iof();
    message.value="";
});

message.addEventListener("keypress",function(){
    socket.emit("typing",handle.value)
});
// ==================

message.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        iof();
        message.value="";
    }
});

// ==============
//listen fr event from backend
socket.on("chat",function(data){
    feedback.innerHTML="";
    output.innerHTML+="<p><strong>"+ data.handle+":</strong> "+data.message+"</p>";
})

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});