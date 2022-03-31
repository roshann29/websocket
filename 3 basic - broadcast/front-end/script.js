const ws_server = new WebSocket("ws://localhost:2020/webSocket");

// ws_server.send("Hello Server");
ws_server.onopen = () => {
  ws_server.send("Hello Server");
};
