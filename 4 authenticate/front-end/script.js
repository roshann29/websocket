document.addEventListener("DOMContentLoaded", (event) => {
  const ws_server = new WebSocket("ws://localhost:2020/webSocket");
  const messageWindow = document.getElementById("messageWindow");
  const sendButton = document.getElementById("btnSend");
  const btnBroadcast = document.getElementById("btnBroadcast");

  const elementRef = (sender) => {
    const div = document.createElement("div");
    if (sender === "Client") {
      div.className = "arrow-left p-3 mt-2 text-white bg-success bg-gradient";
    } else if (sender === "Broadcast") {
      div.className = "broadcast p-3 mt-2 text-white bg-success bg-gradient";
    } else {
      div.className = "arrow-right p-3 mt-2 text-white bg-danger bg-gradient";
    }

    return div;
  };
  const createMessageEntry = (message, sender) => {
    const entryContainer = elementRef(sender);
    entryContainer.innerText = `${sender}: ${message}`;
    messageWindow.appendChild(entryContainer);
  };
  const sendMessage = (data, broadcast) => {
    ws_server.send(JSON.stringify({ data, broadcast }));
  };

  sendButton.addEventListener(
    "click",
    () => {
      const data = document.getElementById("inputData").value;
      sendMessage(data, false);
      createMessageEntry(data, "Client");
    },
    false
  );

  btnBroadcast.addEventListener(
    "click",
    () => {
      const data = document.getElementById("inputData").value;
      sendMessage(data, true);
      createMessageEntry(data, "Broadcast");
    },
    false
  );

  ws_server.onopen = () => {
    const data = "Hello Server";
    sendMessage(data, false);
    createMessageEntry(data, "Client");
  };

  ws_server.onmessage = (event) => {
    const { data, broadcast } = JSON.parse(event.data);

    if (broadcast) {
      createMessageEntry(data, "Broadcast");
    } else {
      createMessageEntry(data, "Server");
    }
  };
});
