import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

// creating express app and connect to socket io
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middle Ware
dotenv.config();
app.use(cors());

const users = [{}];

// Run when client connects
io.on('connect', (socket) => {
    console.log('Connected');

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        socket.broadcast.emit('userjoined', { user: 'admin', text: `${users[socket.id]} has joined the chat` });
        socket.emit('welcome', { user: 'admin', text: `Welcome to the chat ${users[socket.id]}` });
    });

    socket.on('message', (data) => {
        // This is used to send emit data to whole socket server
        io.emit('sendMessage', { user: users[data.id], text: data.message, id: data.id });
    })

    socket.on("disconnected", () => {
        socket.broadcast.emit('leave', { user: 'admin', text: `${users[socket.id]} has left the chat` });
    })

    // Except User Everyone Will Get This Message
});

// Server starts listening
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)

});