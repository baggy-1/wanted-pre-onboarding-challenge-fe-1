import { LOCALSTORAGE_KEY } from "@/constants";

export const getAuthToken = () => {
  return localStorage.getItem(LOCALSTORAGE_KEY.AUTH_TOKEN);
};

export const removeAuthToken = () => {
  return localStorage.removeItem(LOCALSTORAGE_KEY.AUTH_TOKEN);
};

export const setAuthToken = (token: string) => {
  return localStorage.setItem(LOCALSTORAGE_KEY.AUTH_TOKEN, token);
};
