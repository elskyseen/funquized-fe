import axios from "axios";
import { setExp } from "../utils/setExp";
import store from "../stores/store";
import { setToken } from "../counter/tokenCounter";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const dispatch = store.dispatch;
    const { token } = store.getState().token;
    const cookie = document.cookie;
    const exp = parseInt(cookie.split("iat=")[1]);
    const date = new Date();
    if (date.getTime() > exp * 1000 || !token) {
      try {
        const { data } = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true,
          timeout: 5000,
        });
        setExp(data.accessToken);
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
