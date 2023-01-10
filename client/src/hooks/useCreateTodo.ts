import { Todo } from "@/types";
import { useState } from "react";
import { authInstance } from "@/api/interceptor";

interface TodoResponse {
  data: Todo;
}

type TodoBody = Pick<Todo, "title" | "content">;

interface CreateTodoParams {
  todoBody: TodoBody;
  onSuccess?: (newTodo: Todo) => void;
  onError?: (todoBody: TodoBody) => void;
  onFinally?: () => void;
}

const useCreateTodo = () => {
  const [newTodo, setNewTodo] = useState<Todo>();
  const [isError, setIsError] = useState(false);

  const createTodo = async ({
    todoBody,
    onSuccess,
    onError,
    onFinally,
  }: CreateTodoParams) => {
    try {
      const {
        data: { data: newTodo },
      } = await authInstance.post<TodoResponse>("/todos", todoBody);
      setNewTodo(newTodo);
      if (onSuccess) {
        onSuccess(newTodo);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      if (onError) {
        onError(todoBody);
      }
    } finally {
      if (onFinally) {
        onFinally();
      }
    }
  };

  return { newTodo, isError, createTodo };
};

export default useCreateTodo;
