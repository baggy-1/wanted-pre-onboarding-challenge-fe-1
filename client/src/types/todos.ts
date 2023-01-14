export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoResponse {
  data: Todo;
}

export interface TodosResponse {
  data: Todo[];
}

export type TodoParmas = Pick<Todo, "title" | "content">;

export type UpdateTodoParams = Pick<Todo, "id" | "title" | "content">;
