const express = require('express');
const { readdirSync } = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room user_${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


readdirSync('./routes').forEach((file) => {
  app.use('/api', require(`./routes/${file}`));
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
