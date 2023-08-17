const express = require("express");
const cors = require("cors");
const app = express();

const { Server } = require("socket.io");

const http = require("http");
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);
  socket.on("send-message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive-message", data);
  });
});

server.listen(3000, () => {
  console.log("server is running");
});
