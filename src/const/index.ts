import { join } from "@/util";

const PAGE_PATH = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  TODOS: "/todos",
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_PATH = {
  TODO: "/todos",
  LOGIN: "/users/login",
  SIGNUP: "/users/create",
};

const API_URL = {
  TODO: join(API_BASE_URL, API_PATH.TODO),
  LOGIN: join(API_BASE_URL, API_PATH.LOGIN),
  SIGNUP: join(API_BASE_URL, API_PATH.SIGNUP),
};

export { PAGE_PATH, API_URL };
