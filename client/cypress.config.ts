import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    AUTH_ADMIN: {
      email: "super@super.sp",
      password: "supersecret",
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
