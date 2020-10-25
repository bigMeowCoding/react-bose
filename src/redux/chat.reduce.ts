import {
  MSG_LIST,
  MSG_READ,
  MSG_RECV,
  MSG_SEND,
  USER_LIST,
} from "./actionType";
import { ChatState } from "@lib/interface";
const initState: ChatState = {
  chatMsg: [],
  unread: 0,
  users: [],
};

export function chat(state = initState, action: any) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatMsg: action.payload.chatMsg,
        users: action.payload.users,
        unread: action.payload.chatMsg.filter((v: any) => {
          return !v.read && v.to === action.payload.userId;
        }).length,
      };
    case MSG_READ:
      const { to, userId, num } = action.payload;
      return {
        ...state,
        chatMsg: state.chatMsg.map((v) => ({
          ...v,
          read: v.to === userId && v.from === to ? true : v.read,
        })),
        unread: state.unread - num,
      };
    case MSG_RECV:
      const n = action.payload.content.to === action.payload.userId ? 1 : 0;
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.payload.content],
        unread: state.unread + n,
      };
    default:
      return state;
  }
}
