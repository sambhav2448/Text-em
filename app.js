const express=require("express");
const app=express();
const socket=require("socket.io");



app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname+"/public"))//css

// =========================================================


app.get('/', function (req, res){
    res.render('chat.html');
});



// server==================================================
const server=app.listen(process.env.PORT ||248,function(){
    console.log("Chat Server Started on localhost:248...")
});

// socket part================================

const io=socket(server);
io.on("connection",function(socket){
    console.log('made a socket connection',socket.id);

    socket.on("chat",function(data){
        io.sockets.emit("chat",data);
    });


    socket.on("typing",function(data){
        socket.broadcast.emit("typing",data);
    });


});