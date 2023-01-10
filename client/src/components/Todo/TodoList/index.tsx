import { API_URL, PAGE_PATH } from "@/const";
import { Todo } from "@/types";
import { getLocalStorageItem, join } from "@/util";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./TodoList.module.css";

interface Props {
  todos: Todo[];
  refetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList = ({ todos, refetch }: Props) => {
  const navigate = useNavigate();

  const onClickTodo = (id: string) => () => {
    navigate(`${PAGE_PATH.TODOS}/${id}`);
  };

  const onClickDeleteTodo = (id: string) => async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }

    try {
      await axios.delete(join(API_URL.TODO, "/", id), {
        headers: {
          Authorization: getLocalStorageItem("token"),
        },
      });

      refetch(true);
      navigate(PAGE_PATH.HOME, { replace: true });
    } catch (error) {
      console.error(error);
    }
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
