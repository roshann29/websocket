import { WebSocketServer } from "ws";

const ws_server = new WebSocketServer(
  {
    port: 2020,
  },
  () => {
    console.log(`server started`);
  }
);

ws_server.on("connection", (ci, req) => {
  ci.send("Hello Client!");
  ci.on("message", (data, isBinary) => {
    ci.send(`Hey! I got your message: ${isBinary ? data : data.toString()}`);
  });
});
