import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + "/public"));
app.use("/css/bulma", express.static(__dirname + "/node_modules/bulma/css"));
app.use(
  "/css/fontawesome",
  express.static(__dirname + "/node_modules/fontawesome-free")
);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat:in-ask", (chatName) => {
    socket.emit("chat:in-reply", `Hello, ${chatName}`);
  });
  socket.on("chat:msg-send", (msg) => {
    console.log("message: " + msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
