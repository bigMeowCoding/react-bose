import { UserState } from "../../src/interface/login-register";

export interface StoreState {
  counter: number;
  auth: {
    isAuth: boolean;
    user: string;
    age: number;
  };
  user: UserState;
}
