import { AuthParmas, AuthResponse } from "@/types/auth";
import { API_PATH } from "@/constants";
import { createApi } from "@/services/api";
import { AxiosError } from "axios";

export const userLogin = (params: AuthParmas) => {
  const api = createApi();
  return api.post<null, AuthResponse>(API_PATH.LOGIN, params);
};

export const userSignUp = (params: AuthParmas) => {
  const api = createApi();
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
      alert(error.response.data.details);
      return;
    default:
      console.error(error);
  }
};
