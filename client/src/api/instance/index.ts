import { API_BASE_URL } from "@/const";
import { getAuthToken } from "@/util/auth";
import axios from "axios";

const authInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: getAuthToken(),
  },
});

export { authInstance };
