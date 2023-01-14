import { PAGE_PATH } from "@/constants";
import { Todo } from "@/types/todos";
import { join } from "@/utils";
import { useNavigate } from "react-router-dom";
import { deleteTodo } from "@/services/todos";
import { useMutation } from "@tanstack/react-query";

interface Props {
  item: Todo;
}

const TodoItem = ({ item }: Props) => {
  const link = join(PAGE_PATH.TODOS, "/", item.id);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      navigate(PAGE_PATH.HOME, { replace: true });
    },
  });

  const onClickDeleteTodo = (id: string) => async () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    mutate(id);
  };

  return (
    <div className="relative flex items-center justify-between w-full h-12 p-2 border-t border-b hover:bg-blue-500 hover:text-white cursor-pointer">
      <div onClick={() => navigate(link)}>
        <div className="h-auto overflow-hidden break-all w-36 whitespace-nowrap text-ellipsis">
          {item.title}
        </div>
      </div>
      <button className="rounded-full" onClick={onClickDeleteTodo(item.id)}>
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
