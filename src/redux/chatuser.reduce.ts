import { USER_LIST } from "./actionType";

const initState = {
  userList: [],
};
export default function chatUser(state = initState, action: any) {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
}
