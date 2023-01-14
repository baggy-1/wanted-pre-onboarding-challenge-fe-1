import { API_PATH } from "@/constants";
import { createApi } from "@/services/api";
import { Response, Todo, TodoParmas, UpdateTodoParams } from "@/types/todos";
import { join } from "@/utils";

export const getTodos = () => {
  const api = createApi();
  return api.get<null, Response<Todo[]>>(API_PATH.TODO);
};

export const addTodo = (params: TodoParmas) => {
  const api = createApi();
  return api.post<null, Response<Todo>>(API_PATH.TODO, params);
};

export const updateTodo = ({ id, ...params }: UpdateTodoParams) => {
  const api = createApi();
  return api.put<null, Response<Todo>>(join(API_PATH.TODO, "/", id), params);
};

export const deleteTodo = (id: string) => {
  const api = createApi();
  return api.delete<null, Response<null>>(join(API_PATH.TODO, "/", id));
};
