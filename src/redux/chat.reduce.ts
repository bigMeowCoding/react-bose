import { MSG_LIST, MSG_RECV, MSG_SEND, USER_LIST } from "./actionType";
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
        unread: action.payload.chatMsg.filter((v: any) => !v.read).length,
      };

    case MSG_RECV:
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.payload.content],
        unread: state.unread + 1,
      };
    default:
      return state;
  }
}
