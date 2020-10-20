import utility from "utility";

export function md5PwdEncryption(pwd: string): string {
  const salt = "12345aA!_zyj_19910303";
  return utility.md5(utility.md5(pwd + salt));
}
