import { Outlet as OutLetTodoDetail } from "react-router-dom";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodosProvider from "@/provider/todos";

const Home = () => {
  return (
    <TodosProvider>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-5rem)]">
        <div className="flex items-center justify-center w-4/5 max-w-5xl shadow-2xl h-4/5 max-h-5xl rounded-2xl">
          <div className="w-1/5 h-full border-r-4">
            <TodoList />
          </div>
          <div className="w-4/5 h-full">
            <div className="flex items-center justify-center w-full h-4/5">
              <OutLetTodoDetail />
            </div>
            <div className="flex items-center justify-center w-full border-t-4 h-1/5">
              <TodoForm />
            </div>
          </div>
        </div>
      </div>
    </TodosProvider>
  );
};

export default Home;
