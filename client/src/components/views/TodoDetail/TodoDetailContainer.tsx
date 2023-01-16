import { useNavigate, useParams } from "react-router-dom";
import useInput from "@/utils/hooks/useInput";
import { FormEvent, useState } from "react";
import { confirm } from "@/utils";
import { PAGE_PATH } from "@/constants";
import Form from "@/components/common/Form";
import { getTodoById, updateTodo, deleteTodo } from "@/services/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY } from "@/services/cacheKeys";
import { UpdateTodoParams } from "@/types/todos";

const TodoDetail = () => {
  const params = useParams();
  const id = params.id || "";
  const navigate = useNavigate();

  const client = useQueryClient();
  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery(CACHE_KEY.todo(id), () => getTodoById(id));
  const { mutate: updateMutate } = useMutation(
    (params: UpdateTodoParams) => updateTodo(params),
    {
      onSuccess: () => {
        client.invalidateQueries(CACHE_KEY.todos);
      },
    }
  );
  const { mutate: deleteMutate } = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      client.invalidateQueries(CACHE_KEY.todos);
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const {
    others: { setValue: setTitle },
    props: titleProps,
  } = useInput({ initValue: todo?.title });
  const {
    others: { setValue: setContent },
    props: contentProps,
  } = useInput({ initValue: todo?.content });

  const onClickMoveHome = () => {
    navigate(PAGE_PATH.HOME, { replace: true });
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return (
      <>
        <div>유효하지 않은 Todo입니다.</div>
        <button onClick={onClickMoveHome}>메인으로 가기</button>
      </>
    );
  }

  const onClickDeleteTodo = (id: string) => () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    deleteMutate(id);
    navigate(PAGE_PATH.HOME, { replace: true });
  };

  const isUpdateInputValues = () => {
    return (
      titleProps.value !== todo.title || contentProps.value !== todo.content
    );
  };

  const onSubmitTodoEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isUpdateInputValues()) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    if (!confirm("정말 수정하시겠습니까?")) {
      return;
    }

    updateMutate({
      id: todo.id,
      title: titleProps.value,
      content: contentProps.value,
    });
    setIsEdit(false);
  };

  const onClickToggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const setPrevTodoValues = () => {
    const { title, content } = todo;
    setTitle(title);
    setContent(content);
  };

  const onClickCancelEdit = () => {
    setPrevTodoValues();
    onClickToggleEdit();
  };

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

export default TodoDetail;
