import { API_PATH } from "@/constants";
import { createApi } from "@/services/api";
import { TodoBody, TodoResponse, TodosResponse } from "@/types/todos";
import { join } from "@/utils";

export const getTodos = () => {
  const api = createApi();
  return api.get<TodosResponse>(API_PATH.TODO);
};

export const addTodo = (body: TodoBody) => {
  const api = createApi();
  return api.post<TodoResponse>(API_PATH.TODO, body);
};

export const updateTodo = (id: string, body: TodoBody) => {
  const api = createApi();
  return api.put<TodoResponse>(join(API_PATH.TODO, "/", id), body);
};

export const deleteTodo = (id: string) => {
  const api = createApi();
  return api.delete<null>(join(API_PATH.TODO, "/", id));
};
