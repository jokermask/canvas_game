var io = require('socket.io')() ;

io.on('connection',function(socket){
    console.log("socketID: "+socket.id) ;
    var roomId = null ;

    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });

    socket.on('addPlayer',function(data){
        socket.broadcast.emit('addPlayer', data);
    });

}) ;

exports.listen = function(server){
    return io.listen(server) ;
}

