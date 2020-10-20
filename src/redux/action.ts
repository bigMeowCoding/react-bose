import {
  Add,
  ERROR_MSG,
  LOGIN,
  LOGOUT,
  Minus,
  REGISTER_SUCCESS,
} from "./actionType";
import { UserInfoParam, UserType } from "../interface/login-register";
import { service } from "../http-util/axios";

export function addNumber() {
  return {
    type: Add,
  };
}

export function minusNumber() {
  return {
    type: Minus,
  };
}

export function asyncAddNumber() {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(addNumber());
    }, 2000);
  };
}
export function login() {
  return {
    type: LOGIN,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}

export function registerSuccess(data: {
  name: string;
  pwd: string;
  type: UserType;
}) {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
}

export function errorMessage(msg: string) {
  return {
    type: ERROR_MSG,
    msg,
  };
}
// ACTION
export function register(param: UserInfoParam) {
  const { name, pwd, repeatPwd, type } = param;
  if (!name || !pwd || !type) {
    return errorMessage("用户密码必须输入！");
  }
  if (pwd !== repeatPwd) {
    return errorMessage("密码和确认密码不同！");
  }
  return (dispatch: any) => {
    // 异步请求
    service.post(`/user/register`, { name, pwd, type }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({ name, pwd, type }));
      } else {
        dispatch(errorMessage(res.data.msg));
      }
    });
  };
}
