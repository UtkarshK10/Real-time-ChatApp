const express = require('express');
const app= express();
const http= require('http').createServer(app);
const io= require('socket.io')(http);

app.use(express.static(__dirname + '/../frontend'));

http.listen(5000);
console.log('server running at http//:localhost:5000')
const users={}
const typers={}
io.on('connection', socket => {
   // console.log('connected...');
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect',name=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    });
    socket.on('user-typing',name=>{
        typers[socket.id]=name;
        socket.broadcast.emit('typing',typers[socket.id])
    });
    socket.on('user-stopped-typing',()=>{
        delete typers[socket.id]
        socket.broadcast.emit('stop')   
    });
});


