import { API_PATH, PAGE_PATH } from "@/const";
import useMutationTodo from "@/hooks/useMutationTodo";
import { Todo } from "@/types";
import { confirm, join } from "@/util";
import { useNavigate } from "react-router-dom";
import styles from "./TodoList.module.css";

interface Props {
  todos: Todo[];
  refetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList = ({ todos, refetch }: Props) => {
  const navigate = useNavigate();
  const { mutateTodo } = useMutationTodo();

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
        refetch(true);
        navigate(PAGE_PATH.HOME, { replace: true });
      },
    });
  };

  return (
    <div className={styles.todoBox}>
      <h1>Todo 목록</h1>
      {todos.length === 0 ? (
        <div>새로운 TODO를 만들어보세요!</div>
      ) : (
        todos.map(({ id, title }) => (
          <div key={id}>
            <h3 onClick={onClickTodo(id)}>{title}</h3>
            <button onClick={onClickDeleteTodo(id)}>삭제</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
