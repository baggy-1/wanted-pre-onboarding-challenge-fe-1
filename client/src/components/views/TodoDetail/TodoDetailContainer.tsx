import { useNavigate, useParams } from "react-router-dom";
import { PAGE_PATH } from "@/constants";
import Form from "@/components/common/Form";
import { getTodoById } from "@/services/todos";
import { CACHE_KEY } from "@/services/cacheKeys";
import useSuspendedQuery from "@/utils/hooks/useSuspendedQuery";
import SuspenseErrorBoundary from "@/components/common/SuspenseErrorBoundary";
import useInput from "@/utils/hooks/useInput";
import { useState } from "react";
import Dialog from "@/components/common/Dialog";
import useDialog from "@/components/common/Dialog/hooks";
import useTodoMutation from "@/services/todos/hooks/useTodoMutation";
import { toast } from "@/components/common/Toast";
import type { Todo } from "@/types/todos";
import Header from "./Header";

interface Props {
  todo: Todo;
}

const TodoDetail = ({ todo }: Props) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { updateMutate, deleteMutate } = useTodoMutation();
  const {
    others: { setValue: setTitle },
    props: titleProps,
  } = useInput({ initValue: todo.title });
  const {
    others: { setValue: setContent },
    props: contentProps,
  } = useInput({ initValue: todo.content });
  const {
    handleOpen: openUpdateDialog,
    handleClose: closeUpdateDialog,
    getDialogToRender: getUpdateDialogToRender,
  } = useDialog();
  const {
    handleOpen: openDeleteDialog,
    getDialogToRender: getDeleteDialogToRenter,
  } = useDialog();

  const onClickDeleteTodo = () => {
    deleteMutate(todo.id, {
      onSuccess: () => {
        toast("삭제되었습니다.", { type: "success" });
        navigate(PAGE_PATH.HOME, { replace: true });
      },
    });
  };

  const isUpdateInputValues = () => {
    return (
      titleProps.value !== todo.title || contentProps.value !== todo.content
    );
  };

  const onClickUpdateDialogOpen = () => {
    if (!isUpdateInputValues()) {
      toast("변경된 내용이 없습니다.", { type: "warning" });
      return;
    }
    openUpdateDialog();
  };

  const onClickUpdateTodo = () => {
    updateMutate(
      {
        id: todo.id,
        title: titleProps.value,
        content: contentProps.value,
      },
      {
        onSuccess: () => {
          toast("수정되었습니다.", { type: "success" });
        },
      }
    );

    setIsEdit(false);
    closeUpdateDialog();
  };

  const setPrevTodoValues = () => {
    const { title, content } = todo;
    setTitle(title);
    setContent(content);
  };

  const onClickCancelUpdate = () => {
    setPrevTodoValues();
    setIsEdit(false);
    closeUpdateDialog();
  };

  return (
    <>
      <form className="flex flex-col items-center justify-start w-full h-full gap-8 p-4 border-t-2">
        <div className="flex items-center justify-center w-full h-auto gap-4">
          <Form.Label className="text-xl font-bold">제목</Form.Label>
          <Form.Input
            className="w-4/5 h-8 p-2 text-xl border rounded-lg"
            type="text"
            name="updateTitle"
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
            name="updateContent"
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
              onClick={onClickCancelUpdate}
            >
              취소
            </Form.Button>
            <Form.Button
              className="h-12 border rounded-lg w-36 hover:bg-blue-500 hover:text-white"
              type="button"
              onClick={onClickUpdateDialogOpen}
            >
              저장
            </Form.Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Form.Button
              className="h-12 border rounded-lg w-36 hover:bg-blue-500 hover:text-white"
              type="button"
              onClick={() => setIsEdit(true)}
            >
              수정
            </Form.Button>
            <Form.Button
              className="h-12 border rounded-lg w-36 hover:bg-blue-500 hover:text-white"
              type="button"
              onClick={openDeleteDialog}
            >
              삭제
            </Form.Button>
          </div>
        )}
      </form>

      {getUpdateDialogToRender(({ isOpen }) => {
        return (
          <Dialog isOpen={isOpen} onClose={onClickCancelUpdate}>
            <Dialog.Title>정말 수정하시겠습니까?</Dialog.Title>
            <Dialog.Content>수정을 원하시면 수정을 눌러주세요.</Dialog.Content>
            <Dialog.Actions>
              <Dialog.Button
                onClick={onClickCancelUpdate}
                data-testid="update-cancel"
              >
                취소
              </Dialog.Button>
              <button
                onClick={onClickUpdateTodo}
                data-testid="update-submit"
                autoFocus
              >
                수정
              </button>
            </Dialog.Actions>
          </Dialog>
        );
      })}

      {getDeleteDialogToRenter(({ isOpen, onClose }) => {
        return (
          <Dialog isOpen={isOpen} onClose={onClose}>
            <Dialog.Title>정말 삭제하시겠습니까?</Dialog.Title>
            <Dialog.Content>
              삭제를 진행하면 Todo 기록이 삭제되고
              <br />
              복구할 수 없습니다.
              <br />
              <br />
              삭제를 원하시면 삭제를 눌러주세요.
            </Dialog.Content>
            <Dialog.Actions>
              <Dialog.Button onClick={onClose} data-testid="delete-cancel">
                취소
              </Dialog.Button>
              <button
                onClick={onClickDeleteTodo}
                data-testid="delete-submit"
                autoFocus
              >
                삭제
              </button>
            </Dialog.Actions>
          </Dialog>
        );
      })}
    </>
  );
};

export const TodoDetailContainer = () => {
  const params = useParams();
  const id = params.id || "";
  const navigate = useNavigate();
  const { data: todo } = useSuspendedQuery(CACHE_KEY.todo(id), () =>
    getTodoById(id)
  );

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full">
      <Header
        title="Todo 상세"
        onClose={() => navigate(PAGE_PATH.HOME, { replace: true })}
      />
      <TodoDetail todo={todo} />
    </div>
  );
};

const TodoDetailContainerSuspense = () => {
  return (
    <SuspenseErrorBoundary>
      <TodoDetailContainer />
    </SuspenseErrorBoundary>
  );
};

export default TodoDetailContainerSuspense;
