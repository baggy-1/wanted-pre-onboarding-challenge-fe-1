import { Outlet } from "react-router-dom";
import styles from "./Home.module.css";
import TodoForm from "@/components/Todo/TodoForm";
import TodoList from "@/components/Todo/TodoList";
import TodosProvider from "@/provider/todos";

const Home = () => {
  return (
    <TodosProvider>
      <div className={styles.container}>
        <div className={styles.containerBox}>
          <div className={styles.leftBox}>
            <TodoList />
          </div>
          <div className={styles.rightBox}>
            <div className={styles.todoDetailSection}>
              <Outlet />
            </div>
            <div className={styles.todoForm}>
              <TodoForm />
            </div>
          </div>
        </div>
      </div>
    </TodosProvider>
  );
};

export default Home;
