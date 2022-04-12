import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use("/", express.static(path.resolve(__dirname, "./data")));
const server = app.listen(2020, () => {
  console.log(`server started...`);
});

const wss = new WebSocketServer(
  {
    // noServer: true,
    server,
  },
  () => {
    console.log(`ws server started`);
  }
);

// server.on("upgrade", async function upgrade(request, socket, head) {
//   // socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
//   //socket.destroy();
//   // return socket.end("HTTP/1.1 401 Unauthorized\r\n", "ascii");
//   wss.handleUpgrade(request, socket, head, function done(ws) {
//     wss.emit("connection", ws, request);
//   });
// });

wss.on("connection", (ws, req) => {
  ws.send(
    JSON.stringify({
      data: `connection established...`,
      broadcast: false,
    })
  );
  ws.on("message", (data, isBinary) => {
    data = JSON.parse(data.toString());

    if (data.broadcast) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } else {
      ws.send(
        JSON.stringify({
          data: `Hey! I got your message: ${data.data}`,
          broadcast: data.broadcast,
        })
      );
    }
  });
});
