import {
  AUTH_SUCCESS,
  ERROR_MSG,
  LOAD_DATA,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from "./actionType";
import {
  UserInfoParam,
  UserState,
  UserType,
} from "../interface/login-register";
import getRedirectPath from "../utils/getRedirectPath";
const initState: UserState = {
  isAuth: false,
  msg: "",
  name: "",
  pwd: "",
  type: UserType.genius,
  redirectTo: "",
};
export default function user(
  state: UserState = initState,
  action: { type: any; payload: any; msg: any }
) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        msg: "",
        redirectTo: getRedirectPath(action.payload.type, action.payload.avatar),
        ...action.payload,
      };
    case LOAD_DATA:
      return {
        ...state,
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
