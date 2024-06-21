import { jwtDecode } from "jwt-decode";

export const setCookie = (token: string): void => {
  const { exp } = jwtDecode(token);
  document.cookie = `iat=${exp};SameSite=None;`;
  document.cookie = `isLogin=true;SameSite=None;`;
};
