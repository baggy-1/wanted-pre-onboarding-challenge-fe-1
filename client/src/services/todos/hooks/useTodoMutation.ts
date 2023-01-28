import { CACHE_KEY } from "@/services/cacheKeys";
import { createTodo, deleteTodo, updateTodo } from "@/services/todos";
import { TodoParmas, UpdateTodoParams } from "@/types/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useTodoMutation = () => {
  const client = useQueryClient();

  const { mutate: createMutate } = useMutation(
    (params: TodoParmas) => createTodo(params),
    {
      onSuccess: () => {
        client.invalidateQueries(CACHE_KEY.todos);
      },
    }
  );

  const { mutate: updateMutate } = useMutation(
    (params: UpdateTodoParams) => updateTodo(params),
    {
      onSuccess: ({ id }) => {
        client.invalidateQueries(CACHE_KEY.todos);
        client.invalidateQueries(CACHE_KEY.todo(id));
      },
    }
  );

  const { mutate: deleteMutate } = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      client.invalidateQueries(CACHE_KEY.todos);
    },
  });

  return {
    createMutate,
    updateMutate,
    deleteMutate,
  };
};

export default useTodoMutation;
