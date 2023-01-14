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

  _api.interceptors.response.use((response) => {
    if (response.config.headers?.["Authorization"]) {
      return response.data.data;
    }
    return response.data;
  });

  return _api;
};

const api = createApi();

export default api;
