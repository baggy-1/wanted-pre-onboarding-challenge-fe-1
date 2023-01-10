import { getAuthToken } from "@/util/auth";
import { authInstance } from "../instance";

authInstance.interceptors.request.use(
  (config) => {
    if (!getAuthToken()) {
      return Promise.reject(new Error("인증 토큰이 없습니다."));
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
