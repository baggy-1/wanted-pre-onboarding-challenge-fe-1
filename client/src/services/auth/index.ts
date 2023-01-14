import { AuthParmas, AuthResponse } from "@/types/auth";
import { API_PATH } from "@/constants";
import { createApi } from "@/services/api";

export const userLogin = (params: AuthParmas) => {
  const api = createApi();
  return api.post<AuthResponse>(API_PATH.LOGIN, params);
};

export const userSignUp = (params: AuthParmas) => {
  const api = createApi();
  return api.post<AuthResponse>(API_PATH.SIGNUP, params);
};
