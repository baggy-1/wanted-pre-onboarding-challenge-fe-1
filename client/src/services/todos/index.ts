import { API_PATH } from "@/constants";
import { createApi } from "@/services/api";
import { Todo, TodoParmas, UpdateTodoParams } from "@/types/todos";
import { join } from "@/utils";

export const getTodos = () => {
  const api = createApi();
  return api.get<null, Todo[]>(API_PATH.TODO);
};

export const getTodoById = (id: string) => {
  const api = createApi();
  return api.get<null, Todo>(join(API_PATH.TODO, "/", id));
};

export const addTodo = (params: TodoParmas) => {
  const api = createApi();
  return api.post<null, Todo>(API_PATH.TODO, params);
};

export const updateTodo = ({ id, ...params }: UpdateTodoParams) => {
  const api = createApi();
  return api.put<null, Todo>(join(API_PATH.TODO, "/", id), params);
};

export const deleteTodo = (id: string) => {
  const api = createApi();
  return api.delete<null, null>(join(API_PATH.TODO, "/", id));
};
