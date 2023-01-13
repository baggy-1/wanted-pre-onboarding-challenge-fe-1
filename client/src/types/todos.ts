export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

export interface TodoResponse {
  data: Todo;
}

export interface TodosResponse {
  data: Todo[];
}

export type TodoBody = Pick<Todo, "title" | "content">;
