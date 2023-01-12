import { TodosResponse } from "@/types";
import Todo from "@/components/Todo";
import { API_PATH, PAGE_PATH } from "@/const";
import { confirm, join } from "@/util";
import { useNavigate } from "react-router-dom";
import { useTodosDispatch, useTodosState } from "@/provider/todos";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { authInstance } from "@/api/interceptor";

const TodoList = () => {
  const navigate = useNavigate();
  const { todos } = useTodosState();
  const dispatch = useTodosDispatch();
  const { mutate } = useMutation(authInstance);
  const { isLoading, isError } = useQuery<TodosResponse>(API_PATH.TODO, {
    onSuccess: ({ data: todos }) => {
      dispatch({ type: "SET_TODOS", payload: { todos } });
    },
  });

  const onClickDeleteTodo = (id: string) => async () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    mutate({
      url: join(API_PATH.TODO, "/", id),
      method: "delete",
      onSuccess: () => {
        dispatch({ type: "DELETE_TODO", payload: { id } });
        navigate(PAGE_PATH.HOME, { replace: true });
      },
    });
  };

  if (isLoading) {
    return <div>멋진 Todo를 가져오는 중...</div>;
  }

  if (isError || !todos) {
    return <div>Todo를 가져오는데 실패했습니다.</div>;
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-20 p-4 text-2xl font-bold text-center border-b-2">
        Todo 목록
      </div>
      <div className="w-full h-[calc(100%-5rem)] overflow-auto">
        {todos.length === 0 ? (
          <div className="w-full h-auto p-4 font-bold text-center">
            새로운 TODO를 만들어보세요!
          </div>
        ) : (
          todos.map(({ id, title }) => (
            <Todo key={id}>
              <Todo.Link href={join(PAGE_PATH.TODOS, "/", id)}>
                <Todo.Title>{title}</Todo.Title>
              </Todo.Link>
              <Todo.Button onClick={onClickDeleteTodo(id)}>❌</Todo.Button>
            </Todo>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
