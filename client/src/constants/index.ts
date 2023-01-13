import { join } from "@/utils";

const PAGE_PATH = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  TODOS: "/todos",
} as const;

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const API_PATH = {
  TODO: "/todos",
  LOGIN: "/users/login",
  SIGNUP: "/users/create",
} as const;

const API_URL = {
  TODO: join(API_BASE_URL, API_PATH.TODO),
  LOGIN: join(API_BASE_URL, API_PATH.LOGIN),
  SIGNUP: join(API_BASE_URL, API_PATH.SIGNUP),
};

const AUTH_TYPE = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const;

const LOCALSTORAGE_KEY = {
  AUTH_TOKEN: "token",
} as const;

const REGEXP = {
  EMAIL: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
  PASSWORD: /^.{8,}$/,
};

export {
  PAGE_PATH,
  API_BASE_URL,
  API_URL,
  API_PATH,
  AUTH_TYPE,
  LOCALSTORAGE_KEY,
  REGEXP,
};
