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

const AUTH_FORM_BOX_LINK_FOR_TYPE = {
  LOGIN: {
    text: "처음이신가요?",
    link: PAGE_PATH.SIGNUP,
    value: "회원가입",
  },
  SIGNUP: {
    text: "이미 가입하셨나요?",
    link: PAGE_PATH.LOGIN,
    value: "로그인",
  },
};

const AUTH_TYPE = {
  LOGIN: {
    text: "로그인",
    api: API_URL.LOGIN,
  },
  SIGNUP: {
    text: "회원가입",
    api: API_URL.SIGNUP,
  },
};

export { PAGE_PATH, API_URL, AUTH_TYPE, AUTH_FORM_BOX_LINK_FOR_TYPE };
