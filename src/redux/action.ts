import {
  Add,
  AUTH_SUCCESS,
  ERROR_MSG,
  LOAD_DATA,
  LOGIN_SUCCESS,
  LOGOUT,
  Minus,
  REGISTER_SUCCESS,
} from "./actionType";
import {
  PerfectUserInfoParam,
  UserInfoParam,
  UserType,
} from "../common/interface/login-register";
import { service } from "../http-util/axios";
import { useHistory } from "react-router-dom";

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

export function registerSuccess(data: {
  name: string;
  pwd: string;
  type: UserType;
}) {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
}
export function loginSuccess(data: {
  name: string;
  pwd: string;
  type: UserType;
}) {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
}
export function authSuccess(data: {
  name: string;
  pwd: string;
  type: UserType;
}) {
  return {
    type: AUTH_SUCCESS,
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
export function logout() {
  return {
    type: LOGOUT,
  };
}
export function login(param: UserInfoParam) {
  const { name, pwd, type } = param;
  if (!name || !pwd || !type) {
    return errorMessage("用户密码必须输入！");
  }

  return (dispatch: any) => {
    // 异步请求
    service.post(`/user/login`, { name, pwd, type }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({ ...res.data.data, pwd }));
      } else {
        dispatch(errorMessage(res.data.msg));
      }
    });
  };
}
export function loadData(data: any) {
  return {
    type: LOAD_DATA,
    payload: data,
  };
}

export function userInfo() {
  return (dispatch: any) => {
    // 异步请求
    service.get(`/user/info`).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loadData(res.data.data));
      } else {
        dispatch(errorMessage(res.data.msg));
      }
    });
  };
}

export function update(param: PerfectUserInfoParam) {
  return (dispatch: any) => {
    // 异步请求
    service.post(`/user/update`, param).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMessage(res.data.msg));
      }
    });
  };
}
