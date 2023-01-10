import { LOCALSTORAGE_KEY } from "@/const";
import getLocalStorageItem from "../getLocalStorageItem";
import removeLocalStorageItem from "../removeLocalStorageItem";

const getAuthToken = () => {
  return getLocalStorageItem(LOCALSTORAGE_KEY.AUTH_TOKEN);
};

const removeAuthToken = () => {
  return removeLocalStorageItem(LOCALSTORAGE_KEY.AUTH_TOKEN);
};

const setAuthToken = (token: string) => {
  return localStorage.setItem(LOCALSTORAGE_KEY.AUTH_TOKEN, token);
};

export { getAuthToken, removeAuthToken, setAuthToken };
