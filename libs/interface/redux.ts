import { UserState } from "../../src/common/interface/login-register";
import { UserInfo } from "../../src/common/interface/user";
interface ChatUserState {
  userList: UserInfo[];
}
export interface StoreState {
  counter: number;
  auth: {
    isAuth: boolean;
    user: string;
    age: number;
  };
  user: UserState;
  chatUser: ChatUserState;
}
