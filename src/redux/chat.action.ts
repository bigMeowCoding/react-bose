import { service } from "../http-util/axios";
import { HttpStatus } from "../common/interface/http";
import { MSG_CLEAR, MSG_LIST, MSG_READ, MSG_RECV } from "./actionType";

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
  return (dispatch: any, getState: any) => {
    socket.on("recvmsg", function (data: any) {
      const userId = getState().user._id;
      dispatch(msgRecv(data, userId));
    });
  };
}
function msgList(msgs: string, users: any[], userId: string) {
  return {
    type: MSG_LIST,
    payload: {
      chatMsg: msgs,
      users,
      userId,
    },
  };
}
function msgRead({
  to,
  userId,
  num,
}: {
  to: string;
  userId: string;
  num: number;
}) {
  return { type: MSG_READ, payload: { to, userId, num } };
}

export function readMsg(to: string) {
  return (dispatch: any, getState: any) => {
    service.post("/user/readmsg", { to }).then((res) => {
      const userId = getState().user._id;
      if (res.status == 200 && res.data.code == 0) {
        dispatch(msgRead({ userId, to, num: res.data.num }));
      }
    });
  };
}
function msgRecv(msg: string, userId: string) {
  return {
    type: MSG_RECV,
    payload: {
      content: msg,
      userId,
    },
  };
}
export function msgClear() {
  return {
    type: MSG_CLEAR,
  };
}
export function getMsgList() {
  return (dispatch: any, getState: any) => {
    service.get("/user/getmsglist").then((res) => {
      if (res.status == 200 && res.data.code == HttpStatus.Ok) {
        dispatch(msgList(res.data.msgs, res.data.users, getState().user._id));
      }
    });
  };
}
