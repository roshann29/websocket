import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer((req, res) => {});
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket, req) => {
  socket.emit("welcome", "Socket.io welcomes you!");
  socket.on("message", (message) => {
    console.log(message);
  });
});
server.listen(2020, () => {
  console.log("server started...");
});
