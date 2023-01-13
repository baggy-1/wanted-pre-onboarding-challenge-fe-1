import { API_PATH, PAGE_PATH } from "@/constants";
import useMutation from "@/utils/hooks/useMutation";
import { useTodosDispatch } from "@/providers/todos";
import { Todo } from "@/types/todos";
import { join } from "@/utils";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

interface Props {
  item: Todo;
}

const TodoItem = ({ item }: Props) => {
  const link = join(PAGE_PATH.TODOS, "/", item.id);
  const navigate = useNavigate();
  const { mutate } = useMutation(api);
  const dispatch = useTodosDispatch();

  const navigateLink = (link: string) => {
    navigate(link);
  };

  const onClickDeleteTodo = (id: string) => async () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    mutate({
      url: join(API_PATH.TODO, "/", id),
      method: "delete",
      onSuccess: () => {
        dispatch({ type: "DELETE_TODO", payload: { id } });
        navigate(PAGE_PATH.HOME, { replace: true });
      },
    });
  };

  return (
    <div className="relative flex items-center justify-between w-full h-12 p-2 border-t border-b hover:bg-blue-500 hover:text-white cursor-pointer">
      <div onClick={() => navigateLink(link)}>
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
