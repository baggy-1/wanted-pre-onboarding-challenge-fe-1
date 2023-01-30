import { PAGE_PATH } from "@/constants";
import type { Todo } from "@/types/todos";
import { join } from "@/utils";
import { useNavigate } from "react-router-dom";

interface Props {
  item: Todo;
}

const TodoItem = ({ item }: Props) => {
  const link = join(PAGE_PATH.TODOS, "/", item.id);
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-between w-full h-12 p-2 border-t border-b hover:bg-blue-500 hover:text-white cursor-pointer"
      onClick={() => navigate(link)}
    >
      <div className="h-auto overflow-hidden break-all w-36 whitespace-nowrap text-ellipsis">
        {item.title}
      </div>
    </div>
  );
};

export default TodoItem;
