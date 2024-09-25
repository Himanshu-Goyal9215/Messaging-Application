
const io = require('socket.io')(8000, {
        cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
        }
        
    });



const users = {};

io.on('connection', socket =>{
        socket.on('new-user-joined', username => {
                console.log("New user", username);
                users[socket.id]= username;
                socket.broadcast.emit('user-joined', username);
        })

        socket.on('send', message=>{
                socket.broadcast.emit('receive', { message: message, username: users[socket.id]});
        });

        socket.on('disconnect', message =>{
                console.log("User disconnected");
                socket.broadcast.emit('user-left', users[socket.id]);  // broadcasting to all users except the disconnected one.
                delete users[socket.id];
        })
        
})

