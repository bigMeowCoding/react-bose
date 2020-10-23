import { service } from "../http-util/axios";
import { USER_LIST } from "./actionType";
import { UserInfo } from "../common/interface/user";

export function getUserList(type: string) {
  return (dispatch: any) => {
    service.get("/user/list?type=" + type).then((res) => {
      if (res.data.code == 0) {
        dispatch(userList(res.data.data));
      }
    });
  };
}
function userList(data: UserInfo[]) {
  return { type: USER_LIST, payload: data };
}
