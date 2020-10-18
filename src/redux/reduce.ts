import { Add, Minus } from "./actionType";

export const counter = (
  state: number | undefined,
  action: { type: any }
): any => {
  if (!state) {
    return 10;
  }
  switch (action.type) {
    case Add:
      return state + 1;
    case Minus:
      return state - 1;
    default:
      return 10;
  }
};
