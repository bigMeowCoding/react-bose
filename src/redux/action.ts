import { Add, Minus } from "./actionType";

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
