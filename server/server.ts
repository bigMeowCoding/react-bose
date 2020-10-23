import express from "express";
const bodyParser = require("body-parser");
import cookieParser from "cookie-parser";
import userRouter from "./user";
import model from "./model";
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/user", userRouter);
const server = require("http").Server(app);

const io = require("socket.io")(server);
const Chat = model.getModel("chat");

io.on("connection", function (socket: any) {
  // console.log('user login')
  socket.on("sendmsg", function (data: any) {
    // console.log(IIdata)
    const { from, to, msg } = data;
    const chatId = [from, to].sort().join("_");
    Chat.create({ chatId, from, to, content: msg }, function (err, doc) {
      io.emit("recvmsg", data);
    });
    // console.log(data)
    // io.emit('recvmsg',data)
  });
});
server.listen(9093, () => {
  console.log("node app start 9093");
});
