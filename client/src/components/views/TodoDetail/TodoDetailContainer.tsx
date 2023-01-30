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

const TodoDetail = () => {
  const params = useParams();
  const id = params.id || "";
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { data: todo } = useSuspendedQuery(CACHE_KEY.todo(id), () =>
    getTodoById(id)
  );
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
    isOpen: isOpenUpdateDialog,
    handleToggle: toggleUpdateDialog,
    handleClose: handleUpdateDialogClose,
  } = useDialog();
  const { isOpen: isOpenDeleteDialog, handleToggle: toggleDeleteDialog } =
    useDialog();

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

  const handleUpdateDialog = () => {
    if (!isUpdateInputValues()) {
      toast("변경된 내용이 없습니다.", { type: "warning" });
      return;
    }
    toggleUpdateDialog();
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
    toggleUpdateDialog();
  };

  const setPrevTodoValues = () => {
    const { title, content } = todo;
    setTitle(title);
    setContent(content);
  };

  const onClickCancelUpdate = () => {
    setPrevTodoValues();
    setIsEdit(false);
    handleUpdateDialogClose();
  };

  const onClickCancelDelete = () => {
    toggleDeleteDialog();
  };

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full">
      <div className="w-full h-auto p-4 text-2xl font-bold text-center border-b-2">
        Todo 상세
      </div>
      <button
        className="absolute top-0 right-0 p-2 text-2xl font-bold text-red-500"
        onClick={() => navigate(PAGE_PATH.HOME, { replace: true })}
      >
        ❌
      </button>
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
              onClick={handleUpdateDialog}
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
              onClick={toggleDeleteDialog}
            >
              삭제
            </Form.Button>
          </div>
        )}
      </form>

      <Dialog isOpen={isOpenUpdateDialog} onClose={onClickCancelUpdate}>
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

      <Dialog isOpen={isOpenDeleteDialog} onClose={onClickCancelDelete}>
        <Dialog.Title>정말 삭제하시겠습니까?</Dialog.Title>
        <Dialog.Content>
          삭제를 진행하면 Todo 기록이 삭제되고 <br />
          복구할 수 없습니다.
          <br />
          <br />
          삭제를 원하시면 삭제를 눌러주세요.
        </Dialog.Content>
        <Dialog.Actions>
          <Dialog.Button
            onClick={onClickCancelDelete}
            data-testid="delete-cancel"
          >
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
