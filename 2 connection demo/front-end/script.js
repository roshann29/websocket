const ws_server = new WebSocket("ws://localhost:2020/webSocket");

const btnPrivate = document.getElementById("btnPrivate");
const btnPublic = document.getElementById("btnPublic");

// ws_server.send("Hello Server");
ws_server.onopen = () => {
  ws_server.send("Hello Server");
};
