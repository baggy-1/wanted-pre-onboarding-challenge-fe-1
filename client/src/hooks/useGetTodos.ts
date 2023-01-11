import { authInstance } from "@/api/interceptor";
import { API_PATH } from "@/const";
import { Todo } from "@/types";
import { useEffect, useState } from "react";

interface TodoResponse {
  data: Todo[];
}

interface Options {
  onSuccess?: (data: TodoResponse) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

const fetchGetTodos = async () => {
  return await authInstance.get<TodoResponse>(API_PATH.TODO);
};

const useGetTodos = (options?: Options) => {
  const [todos, setTodos] = useState<Todo[]>();
  const [isError, setisError] = useState(false);

  useEffect(() => {
    fetchGetTodos()
      .then(({ data: { data: todos } }) => {
        setTodos(todos);
        options?.onSuccess?.({ data: todos });
      })
      .catch((error) => {
        console.error(error);
        setisError(true);
        options?.onError?.(error);
      })
      .finally(() => {
        options?.onFinally?.();
      });
  }, []);

  return {
    todos,
    isLoading: !isError && !todos,
    isError,
  };
};

export default useGetTodos;
