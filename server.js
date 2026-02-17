const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const Message = require('./Models/message.js');
const authRoute = require('./Routes/route.js');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRoute)

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', async (socket) => {
    console.log('A user connected');
    const messages = (await Message.find().sort({timestamp: -1}).limit(50)).reverse();
    socket.emit('old-messages', messages)
    socket.on('chat-message', async (data) => {
        const message = new Message({text: data.text, username: data.username});
        await message.save();
        console.log('Saved message:', data);
        io.emit('chat-message', data);
    });
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));