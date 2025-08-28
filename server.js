const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = 'path';

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity in this demo
    }
});

app.use(express.static('public'));

const users = new Map();

// When a client connects, they join a "lobby"
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    users.set(socket.id, {});

    // Forward messages to the intended recipient
    socket.on('signal', (data) => {
        const { to, from, signal } = data;
        console.log(`Forwarding signal from ${from} to ${to}`);
        socket.to(to).emit('signal', { from, signal });
    });

    // Let a new user know who is already here
    const otherUsers = Array.from(users.keys()).filter(id => id !== socket.id);
    socket.emit('users-present', otherUsers);

    // Let everyone else know a new user has arrived
    socket.broadcast.emit('user-joined', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        users.delete(socket.id);
        io.emit('user-left', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Signaling server running on port ${PORT}`);
    console.log('To run: node server.js');
});