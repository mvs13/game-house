let socket = undefined;

const inChat = document.querySelector('#inchat-btn');
const outChat = document.querySelector('#outchat-btn');
outChat.disabled = true;
const inputMsg = document.querySelector('#input')
const sendMsg = document.querySelector('#sendmsg-btn');
sendMsg.disabled = true;

inChat.addEventListener('click', (e) => { 
  if (socket === undefined) {
    socket = io();
    if (socket !== undefined) {
      inChat.disabled = true;
      outChat.disabled = false;  
      sendMsg.disabled = false
    }
  }
});

outChat.addEventListener('click', (e) => { 
  if (socket !== undefined) {
    socket.close(); inChat.disabled = false; outChat.disabled = true; socket = undefined;
  }
});

sendMsg.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputMsg.value) {
    socket.emit('chat:message', inputMsg.value);
    inputMsg.value = '';
  }
});