let socket = undefined;

const chatName = document.querySelector("#chat-name");
const inChat = document.querySelector("#inchat-btn");
const outChat = document.querySelector("#outchat-btn");
outChat.disabled = true;
const inputMsg = document.querySelector("#input");
const sendMsg = document.querySelector("#sendmsg-btn");
sendMsg.disabled = true;

operateNotification("notify");

inChat.addEventListener("click", (e) => {
  if (socket === undefined && chatName.value !== "") {
    socket = io();
    if (socket !== undefined) {
      inChat.disabled = true;
      outChat.disabled = false;
      sendMsg.disabled = false;
      socket.emit("chat:in-ask", chatName.value);
      socket.on("chat:in-reply", (answer) => {
        showNotificationMsg("notify", answer);
      });
    }
  } else {
    showNotificationMsg("notify", "Please enter a chat name");
  }
});

outChat.addEventListener("click", (e) => {
  if (socket !== undefined) {
    socket.close();
    inChat.disabled = false;
    outChat.disabled = true;
    socket = undefined;
  }
});

sendMsg.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputMsg.value) {
    socket.emit("chat:msg-send", inputMsg.value);
    inputMsg.value = "";
  } else {
    showNotificationMsg("notify", "Please enter a message");
  }
});
