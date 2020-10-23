import express from "express";
const bodyParser = require("body-parser");
import cookieParser from "cookie-parser";
import userRouter from "./user";
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/user", userRouter);
const server = require("http").Server(app);

const io = require("socket.io")(server);

io.on("connection", function (socket:any) {
  // console.log('user login')
  socket.on("sendmsg", function (data:any) {
    // console.log(data)
    const { from, to, msg } = data;
    // const chatid = [from, to].sort().join("_");
    // Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
      io.emit("recvmsg", data);
    // });
    // console.log(data)
    // io.emit('recvmsg',data)
  });
});
server.listen(9093, () => {
  console.log("node app start 9093");
});
