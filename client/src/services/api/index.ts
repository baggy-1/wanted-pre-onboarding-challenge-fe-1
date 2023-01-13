import { API_BASE_URL } from "@/constants";
import { getAuthToken } from "@/utils";
import axios from "axios";

export const createApi = () => {
  const token = getAuthToken();

  const _api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      ...(token && { Authorization: token }),
    },
  });

  return _api;
};

const api = createApi();

export default api;