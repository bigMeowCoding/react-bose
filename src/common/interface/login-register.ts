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
  redirectTo: string;
  _id?: string;
}

export interface PerfectUserInfoParam {
  title: string;
  company: string;
  money: string;
  desc: string;
  avatar: string;
}
