import TodoItem from "@/components/common/TodoItem";
import { getTodos } from "@/services/todos";
import { CACHE_KEY } from "@/services/cacheKeys";
import useSuspendedQuery from "@/utils/hooks/useSuspendedQuery";
import SuspenseErrorBoundary from "@/components/common/SuspenseErrorBoundary";

const TodoList = () => {
  const { data: todos } = useSuspendedQuery(CACHE_KEY.todos, getTodos);

  return (
    <SuspenseErrorBoundary>
      <div className="w-full h-full overflow-hidden">
        <div className="w-full h-18 p-4 text-2xl font-bold text-center border-b-[3px]">
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
    </SuspenseErrorBoundary>
  );
};

export default TodoList;
