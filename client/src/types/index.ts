interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
interface AuthResponse {
  message: string;
  token: string;
}

interface TodoResponse {
  data: Todo;
}

export type { Todo, AuthResponse, TodoResponse };
