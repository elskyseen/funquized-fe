import axios from "axios";
import { setCookie } from "../utils/setCookie";
import store from "../stores/store";
import { setToken } from "../counter/tokenCounter";
import { BASE_URL } from "../variable";

const { token } = store.getState().token;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const dispatch = store.dispatch;
    const cookie = document.cookie;
    const exp = parseInt(cookie.split("iat=")[1]);
    const date = new Date();
    if (date.getTime() > exp * 1000) {
      try {
        const { data } = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true,
          timeout: 5000,
        });
        setCookie(data.accessToken);
        dispatch(setToken(data.accessToken));
        config.headers.Authorization = `Bearer ${data.accessToken}`;
      } catch (error) {
        console.log(error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
