import getToken from "@/pages/auth/util/getToken";
import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const {
          data: { data },
        } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/todos`, {
          headers: {
            Authorization: getToken(),
          },
        });

        setTodos(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { todos, isLoading, isError };
};

export default useTodos;
