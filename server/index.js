const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const { addUser, getUser, deleteUser, getUsers } = require('./users');

app.use(express.json());

const server = http.createServer(app);

var port = process.env.PORT || 3001;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {

    socket.on("login", ({ username, room }, callback) => {
        const { user, error } = addUser(socket.id, username, room);
        if(error){
            return callback(error);
        }
        socket.join(user.room);
        socket.in(room).emit("notification", { title: "Someone has joined the group.", description: `${user.username} has entered the group.` });
        io.in(room).emit("users", getUsers(user.room));
        callback();
    });

    socket.on("send_message", (msg) => {
        const user = getUser(socket.id);
        io.in(user.room).emit("message", { username: user.username, text: msg });
    });

    socket.on("disconnect", () => {
        const user = deleteUser(socket.id);
        if(user){
            io.in(user.room).emit("notification", { title: "Someone has left the group.", description: `${user.username} has left the group.` });
            io.in(user.room).emit("users", getUsers(user.room));
        }
    });
});

server.listen(port, () => {
    console.log("Server running");
});