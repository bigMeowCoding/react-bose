export interface StoreState {
  counter: number;
  auth: {
    isAuth: boolean;
    user: string;
    age: number;
  };
}
