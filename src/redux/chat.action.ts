import { service } from "../http-util/axios";
import { HttpStatus } from "../common/interface/http";
import { MSG_LIST, MSG_RECV } from "./actionType";

const io = require("socket.io-client");
const socket = io("ws://localhost:9093");

export function sendMsg({
  from,
  to,
  msg,
}: {
  from: string;
  to: string;
  msg: string;
}) {
  return (dispatch: any) => {
    socket.emit("sendmsg", { from, to, msg });
  };
}

export function recvMsg() {
  return (dispatch: any) => {
    socket.on("recvmsg", function (data: any) {
      console.log(data)
      dispatch(msgRecv(data));
    });
  };
}
function msgList(msgs: string, users: any[]) {
  return {
    type: MSG_LIST,
    payload: {
      chatMsg: msgs,
      users,
    },
  };
}
function msgRecv(msg: string) {
  return {
    type: MSG_RECV,
    payload: {
      content: msg,
    },
  };
}
export function getMsgList() {
  return (dispatch: any) => {
    service.get("/user/getmsglist").then((res) => {
      if (res.status == 200 && res.data.code == HttpStatus.Ok) {
        dispatch(msgList(res.data.msgs, res.data.users));
      }
    });
  };
}
