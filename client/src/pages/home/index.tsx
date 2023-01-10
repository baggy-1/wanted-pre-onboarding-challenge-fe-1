import { Outlet } from "react-router-dom";
import styles from "./Home.module.css";
import TodoForm from "@/components/Todo/TodoForm";
import TodoList from "@/components/Todo/TodoList";
import useGetTodos from "@/hooks/useTodos";

const Home = () => {
  const { todos, isLoading, isError, refetch } = useGetTodos();

  if (isLoading) {
    return <div>아주 멋진 TODO를 가져오고 있습니다.</div>;
  }

  if (isError || !todos) {
    return <div>알 수 없는 에러가 발생했습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerBox}>
        <div className={styles.leftBox}>
          <TodoList todos={todos} refetch={refetch} />
        </div>
        <div className={styles.rightBox}>
          <div className={styles.todoDetailSection}>
            <Outlet context={{ refetch }} />
          </div>
          <div className={styles.todoForm}>
            <TodoForm refetch={refetch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
