import type { AuthParmas, AuthResponse } from "@/types/auth";
import { API_PATH } from "@/constants";
import { AxiosError } from "axios";
import api from "@/services/api";

export const userLogin = (params: AuthParmas) => {
  return api.post<null, AuthResponse>(API_PATH.LOGIN, params);
};

export const userSignUp = (params: AuthParmas) => {
  return api.post<null, AuthResponse>(API_PATH.SIGNUP, params);
};

export const handleAuthError = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    console.error(error);
    return;
  }

  switch (error.response?.status) {
    case 409:
    case 400:
      throw new Error(error.response.data.details);
    default:
      console.error(error);
  }
};
