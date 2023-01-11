import styles from "./TodoList.module.css";
import Todo from "@/components/Todo/Todo";
import { API_PATH, PAGE_PATH } from "@/const";
import useMutationTodo from "@/hooks/useMutationTodo";
import { confirm, join } from "@/util";
import { useNavigate } from "react-router-dom";
import useGetTodos from "@/hooks/useGetTodos";
import { useTodosDispatch, useTodosState } from "@/provider/todos";

const TodoList = () => {
  const navigate = useNavigate();
  const { todos } = useTodosState();
  const dispatch = useTodosDispatch();
  const { mutateTodo } = useMutationTodo();
  const { isLoading, isError } = useGetTodos({
    onSuccess: ({ data: todos }) => {
      dispatch({ type: "SET_TODOS", payload: { todos } });
    },
  });

  const onClickTodo = (id: string) => () => {
    navigate(`${PAGE_PATH.TODOS}/${id}`);
  };

  const onClickDeleteTodo = (id: string) => async () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    mutateTodo({
      url: join(API_PATH.TODO, "/", id),
      method: "delete",
      body: null,
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
    <div className={styles.todoBox}>
      <h1>Todo 목록</h1>
      {todos.length === 0 ? (
        <div>새로운 TODO를 만들어보세요!</div>
      ) : (
        todos.map(({ id, title }) => (
          <Todo key={id}>
            <Todo.Link onClick={onClickTodo(id)}>
              <Todo.Title>{title}</Todo.Title>
            </Todo.Link>
            <Todo.Button onClick={onClickDeleteTodo(id)}>삭제</Todo.Button>
          </Todo>
        ))
      )}
    </div>
  );
};

export default TodoList;
