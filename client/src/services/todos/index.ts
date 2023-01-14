import { API_PATH } from "@/constants";
import { createApi } from "@/services/api";
import { TodoParmas, TodoResponse, TodosResponse } from "@/types/todos";
import { join } from "@/utils";

export const getTodos = () => {
  const api = createApi();
  return api.get<TodosResponse>(API_PATH.TODO);
};

export const addTodo = (params: TodoParmas) => {
  const api = createApi();
  return api.post<TodoResponse>(API_PATH.TODO, params);
};

export const updateTodo = ({ id, ...params }: TodoParmas & { id: string }) => {
  const api = createApi();
  return api.put<TodoResponse>(join(API_PATH.TODO, "/", id), params);
};

export const deleteTodo = (id: string) => {
  const api = createApi();
  return api.delete<null>(join(API_PATH.TODO, "/", id));
};
