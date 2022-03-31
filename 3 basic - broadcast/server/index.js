import { WebSocketServer } from "ws";

const wss = new WebSocketServer(
  {
    port: 2020,
  },
  () => {
    console.log(`server started`);
  }
);

wss.on("connection", (ws, req) => {
  ws.send("Hello Client!");
  ws.on("message", (data, isBinary) => {
    ws.send(`Hey! I got your message: ${isBinary ? data : data.toString()}`);
  });
});
