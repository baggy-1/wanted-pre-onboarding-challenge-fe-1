export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface Response<T> {
  data: T;
}

export type TodoParmas = Pick<Todo, "title" | "content">;

export type UpdateTodoParams = Pick<Todo, "id" | "title" | "content">;
