import { Outlet as OutletTodoDetail } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoItem from "@/components/common/TodoItem";
import { getTodos } from "@/services/todos";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY } from "@/services/cacheKeys";

const TodosContainer = () => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery(CACHE_KEY.todos, getTodos);

  if (isLoading) {
    return <div>멋진 Todo를 가져오는 중...</div>;
  }

  if (isError) {
    return <div>Todo를 가져오는데 실패했습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-center w-4/5 max-w-5xl shadow-2xl h-4/5 max-h-5xl rounded-2xl">
        <div className="w-1/5 h-full border-r-4">
          {/* <TodoList /> */}
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
                todos.map((item) => <TodoItem key={item.id} item={item} />)
              )}
            </div>
          </div>
        </div>
        <div className="w-4/5 h-full">
          <div className="flex items-center justify-center w-full h-4/5">
            <OutletTodoDetail />
          </div>
          <div className="flex items-center justify-center w-full border-t-4 h-1/5">
            <TodoForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosContainer;
