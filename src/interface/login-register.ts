export enum UserType {
  genius = "genius",
  boss = "boss",
}
export interface UserInfoParam {
  name: string;
  pwd: string;
  repeatPwd: string;
  type: UserType;
}

export interface UserState {
  name: string;
  pwd: string;
  type: UserType;
  msg: string;
  isAuth: boolean;
}
