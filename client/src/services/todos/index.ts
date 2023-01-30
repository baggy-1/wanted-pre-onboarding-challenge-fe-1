import { API_PATH } from "@/constants";
import api from "@/services/api";
import { Todo, TodoParmas, UpdateTodoParams } from "@/types/todos";
import { join } from "@/utils";

export const getTodos = () => {
  return api.get<null, Todo[]>(API_PATH.TODO);
};

export const getTodoById = (id: string) => {
  return api.get<null, Todo>(join(API_PATH.TODO, "/", id));
};

export const createTodo = (params: TodoParmas) => {
  return api.post<null, Todo>(API_PATH.TODO, params);
};

export const updateTodo = ({ id, ...params }: UpdateTodoParams) => {
  return api.put<null, Todo>(join(API_PATH.TODO, "/", id), params);
};

export const deleteTodo = (id: string) => {
  return api.delete<null, null>(join(API_PATH.TODO, "/", id));
};
