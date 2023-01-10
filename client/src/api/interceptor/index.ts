import { API_BASE_URL } from "@/const";
import { getAuthToken } from "@/util/auth";
import axios from "axios";

const authInstance = axios.create({
  baseURL: API_BASE_URL,
});

authInstance.interceptors.request.use(
  (config) => {
    const authToken = getAuthToken();
    if (!authToken) {
      return Promise.reject(new Error("인증 토큰이 없습니다."));
    }

    config.headers = { Authorization: authToken };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { authInstance };
