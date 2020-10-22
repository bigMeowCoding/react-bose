import { UserState } from "../../src/common/interface/login-register";

export interface StoreState {
  counter: number;
  auth: {
    isAuth: boolean;
    user: string;
    age: number;
  };
  user: UserState;
}
