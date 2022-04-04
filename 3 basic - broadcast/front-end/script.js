document.addEventListener("DOMContentLoaded", (event) => {
  const ws_server = new WebSocket("ws://localhost:2020/webSocket");
  const messageWindow = document.getElementById("messageWindow");
  const sendButton = document.getElementById("btnPrivate");
  const elementRef = (sender) => {
    const div = document.createElement("div");
    if (sender === "Client") {
      div.className = "p-3 mt-2 text-white bg-success bg-gradient";
    } else {
      div.className = "p-3 mt-2 text-white bg-danger bg-gradient";
    }

    return div;
  };
  const createMessageEntry = (message, sender) => {
    const entryContainer = elementRef(sender);
    entryContainer.innerText = `${sender}: ${message}`;
    messageWindow.appendChild(entryContainer);
  };

  sendButton.addEventListener(
    "click",
    () => {
      const data = document.getElementById("inputData").value;
      ws_server.send(data);
      createMessageEntry(data, "Client");
    },
    false
  );

  ws_server.onopen = () => {
    const data = "Hello Server";
    ws_server.send(data);
    createMessageEntry(data, "Client");
  };

  ws_server.onmessage = (event) => {
    const { data } = event;
    createMessageEntry(data, "Server");
  };
});
