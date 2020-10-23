import { UserType } from "./login-register";

export interface UserInfo extends BossInfo, GeniusInfo {
  _id: string;
  name: string;
  pwd: string;
  type: UserType;
  avatar: string;
  desc: string;
}
export interface BossInfo {
  company: string;
  money: string;
  title: string;
}

export interface GeniusInfo {}
