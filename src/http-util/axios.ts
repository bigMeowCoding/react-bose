
import axios from "axios";
import { Toast } from "antd-mobile";

const service = axios.create({
  baseURL: "/",
  timeout: 5000, // 请求过期时间
});

service.interceptors.request.use((config) => {
  Toast.loading("加载中");
  return config;
});

service.interceptors.response.use((config) => {
  Toast.hide();
  return config;
});

export { service };
