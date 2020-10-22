import { UserType } from "../common/interface/login-register";

export default function getRedirectPath(type: string, avatar: string): string {
  let url = type === UserType.boss ? "/boss" : "/genius";
  if (!avatar) {
    url += "info";
  }
  return url;
}
