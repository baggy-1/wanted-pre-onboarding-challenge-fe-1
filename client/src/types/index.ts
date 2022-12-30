interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

type AuthType = "LOGIN" | "SIGNUP";

interface AuthResponse {
  message: string;
  token: string;
}

export type { Todo, AuthType, AuthResponse };
