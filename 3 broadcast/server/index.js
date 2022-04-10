import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer(
  {
    port: 2020,
  },
  () => {
    console.log(`server started`);
  }
);

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
