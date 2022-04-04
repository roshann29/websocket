import { WebSocketServer } from "ws";

const wss = new WebSocketServer(
  {
    port: 2020,
  },
  () => {
    console.log(`server started`);
  }
);

wss.on("connection", (ci, req) => {
  ci.send("Hello Client!");
  ci.on("message", (data, isBinary) => {
    ci.send(`Hey! I got your message: ${isBinary ? data : data.toString()}`);
  });
});
