const WebSocket = require("ws");

const wss = new WebSocket.Server(
  {
    port: 2020,
  },
  () => {
    console.log("WebSocket server started");
  }
);
