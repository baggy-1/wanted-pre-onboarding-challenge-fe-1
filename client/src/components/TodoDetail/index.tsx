import { useNavigate, useParams } from "react-router-dom";
import useInput from "@/hooks/useInput";
import { FormEvent, useState } from "react";
import { confirm, join } from "@/util";
import { API_PATH, PAGE_PATH } from "@/const";
import useMutation from "@/hooks/useMutation";
import { useTodosDispatch, useTodosState } from "@/provider/todos";
import { TodoResponse } from "@/types";
import { authInstance } from "@/api/interceptor";
import Form from "@/components/common/Form";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate } = useMutation(authInstance);
  const [isEdit, setIsEdit] = useState(false);
  const state = useTodosState();
  const dispatch = useTodosDispatch();
  const todo = state.todos.find((todo) => todo.id === id);
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

  if (!id) {
    return (
      <>
        <div>잘못된 접근입니다.</div>
        <button onClick={onClickMoveHome}>메인으로 가기</button>
      </>
    );
  }

  if (!todo) {
    return (
      <>
        <div>유효하지 않은 Todo입니다.</div>
        <button onClick={onClickMoveHome}>메인으로 가기</button>
      </>
    );
  }

  const onClickToggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickCancelEdit = () => {
    const { title, content } = todo;
    setTitle(title);
    setContent(content);
    onClickToggleEdit();
  };

  const isUpdateInputValues = () => {
    return (
      titleProps.value !== todo.title || contentProps.value !== todo.content
    );
  };

  const onSubmitTodoEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isUpdateInputValues()) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    if (!confirm("정말 수정하시겠습니까?")) {
      return;
    }

    mutate<TodoResponse>({
      url: join(API_PATH.TODO, "/", id),
      method: "put",
      body: { title: titleProps.value, content: contentProps.value },
      onSuccess: ({ data: todo }) => {
        dispatch({ type: "UPDATE_TODO", payload: { todo } });
      },
      onFinally: () => {
        setIsEdit(false);
      },
    });
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
        className="flex flex-col items-center justify-start w-full h-full gap-8 p-4"
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
          <Form.Button
            className="h-12 border rounded-lg w-36 hover:bg-blue-500 hover:text-white"
            type="button"
            onClick={onClickToggleEdit}
          >
            수정
          </Form.Button>
        )}
      </Form>
    </div>
  );
};

export default TodoDetail;
