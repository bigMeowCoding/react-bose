import { ERROR_MSG, REGISTER_SUCCESS } from "./actionType";
import {
  UserInfoParam,
  UserState,
  UserType,
} from "../interface/login-register";
const initState = {
  isAuth: false,
  msg: "",
  name: "",
  pwd: "",
  type: UserType.genius,
};
export default function user(
  state: UserState = initState,
  action: { type: any; payload: any; msg: any }
) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        msg: "",
        ...action.payload,
      };
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg,
      };
    default:
      return state;
  }
}
