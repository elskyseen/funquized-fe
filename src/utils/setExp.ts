import { jwtDecode } from "jwt-decode";

export const setExp = (token: string): void => {
  const { exp } = jwtDecode(token);
  document.cookie = `iat=${exp}`;
};
