
const { Server } = require("socket.io");

module.exports.chatSockets = function(socketServer){

    // let io = require('socket.io')(socketServer);

    let io = new Server(socketServer, { 
        cors: {
            origin: "http://localhost:8000"
          }
     });

    io.sockets.on('connection',function(socket){
        console.log('New Connection Received',socket.id);

        socket.on('disconnect',function(){
            console.log("socket disconnected");
        });
    });
}