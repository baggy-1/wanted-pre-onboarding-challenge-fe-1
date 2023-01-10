import { LOCALSTORAGE_KEY } from "@/const";
import getLocalStorageItem from "../getLocalStorageItem";

const getAuthToken = () => {
  return getLocalStorageItem(LOCALSTORAGE_KEY.AUTH_TOKEN);
};

export { getAuthToken };
