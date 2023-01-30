import { Outlet as OutletTodoDetail } from "react-router-dom";
import Layout from "./Layout";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodosContainer = () => {
  return (
    <Layout
      leftSide={<TodoList />}
      top={<OutletTodoDetail />}
      bottom={<TodoForm />}
    />
  );
};

export default TodosContainer;
