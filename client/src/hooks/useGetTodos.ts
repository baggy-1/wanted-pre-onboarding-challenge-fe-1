import { authInstance } from "@/api/interceptor";
import { API_PATH } from "@/const";
import { Todo } from "@/types";
import { useEffect, useState } from "react";

interface TodoResponse {
  data: Todo[];
}

const fetchGetTodos = async () => {
  return await authInstance.get<TodoResponse>(API_PATH.TODO);
};

const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [isError, setisError] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetchGetTodos()
      .then(({ data: { data: todos } }) => {
        setTodos(todos);
      })
      .catch((error) => {
        console.error(error);
        setisError(true);
      });
  }, [refetch]);

  return {
    todos,
    isLoading: !isError && !todos,
    isError,
    refetch: setRefetch,
  };
};

export default useGetTodos;
