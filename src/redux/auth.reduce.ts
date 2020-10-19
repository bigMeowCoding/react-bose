import { LOGIN, LOGOUT } from "./actionType";

const initState = {
  isAuth: false,
  user: "李云龙",
  age: 20,
};

export function auth(
  state: { isAuth: boolean; user: string; age: number } = initState,
  action: { type: any }
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
}
