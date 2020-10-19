export interface HttpSuccess<T> {
  config: any;
  data: T;
  headers: any;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
export type HttpReturn<T> = HttpSuccess<T>;
