import { useNavigate, useParams } from "react-router-dom";
import { PAGE_PATH } from "@/constants";
import Form from "@/components/common/Form";
import { getTodoById } from "@/services/todos";
import { CACHE_KEY } from "@/services/cacheKeys";
import useTodoDetail from "./hooks/useTodoDetail";
import useSuspendedQuery from "@/utils/hooks/useSuspendedQuery";
import SuspenseErrorBoundary from "@/components/common/SuspenseErrorBoundary";

const TodoDetail = () => {
  const params = useParams();
  const id = params.id || "";
  const navigate = useNavigate();
  const { data: todo } = useSuspendedQuery(CACHE_KEY.todo(id), () =>
    getTodoById(id)
  );

  const onClickMoveHome = () => {
    navigate(PAGE_PATH.HOME, { replace: true });
  };

  const {
    isEdit,
    titleProps,
    contentProps,
    onClickDeleteTodo,
    onSubmitTodoEdit,
    onClickCancelEdit,
    onClickToggleEdit,
  } = useTodoDetail(todo);

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full">
      <div className="w-full h-auto p-4 text-2xl font-bold text-center border-b-2">
        Todo 상세
      </div>
      <button
        className="absolute top-0 right-0 p-2 text-2xl font-bold text-red-500"
        onClick={onClickMoveHome}
      >
        ❌
      </button>
      <Form
        className="flex flex-col items-center justify-start w-full h-full gap-8 p-4 border-t-2"
        onSubmit={onSubmitTodoEdit}
      >
        <div className="flex items-center justify-center w-full h-auto gap-4">
          <Form.Label className="text-xl font-bold">제목</Form.Label>
          <Form.Input
            className="w-4/5 h-8 p-2 text-xl border rounded-lg"
            type="text"
            label="제목"
            {...titleProps}
            disabled={!isEdit}
          />
        </div>
        <div className="flex items-center justify-center w-full h-auto gap-4">
          <Form.Label className="text-xl font-bold">내용</Form.Label>
          <Form.Input
            className="w-4/5 h-32 p-2 text-xl border rounded-lg"
            type="text"
            label="내용"
            {...contentProps}
            disabled={!isEdit}
          />
        </div>
        {isEdit ? (
          <div className="flex gap-4">
            <Form.Button
              className="h-12 border rounded-lg w-36 hover:bg-blue-500 hover:text-white"
              type="button"
              onClick={onClickCancelEdit}
            >
              취소
            </Form.Button>
            <Form.Button
              className="h-12 border rounded-lg w-36 hover:bg-blue-500 hover:text-white"
              type="submit"
            >
              저장
            </Form.Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Form.Button
              className="h-12 border rounded-lg w-36 hover:bg-blue-500 hover:text-white"
              type="button"
              onClick={onClickToggleEdit}
            >
              수정
            </Form.Button>
            <Form.Button
              className="h-12 border rounded-lg w-36 hover:bg-blue-500 hover:text-white"
              type="button"
              onClick={onClickDeleteTodo(id)}
            >
              삭제
            </Form.Button>
          </div>
        )}
      </Form>
    </div>
  );
};

const TodoDetailContainer = () => {
  return (
    <SuspenseErrorBoundary>
      <TodoDetail />
    </SuspenseErrorBoundary>
  );
};

export default TodoDetailContainer;
