import { useNavigate, useParams } from "react-router-dom";
import styles from "./TodoDetail.module.css";
import useInput from "@/hooks/useInput";
import { FormEvent, useState } from "react";
import { confirm, join } from "@/util";
import { API_PATH, PAGE_PATH } from "@/const";
import useMutation from "@/hooks/useMutation";
import { useTodosDispatch, useTodosState } from "@/provider/todos";
import { Todo } from "@/types";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate } = useMutation();
  const [isEdit, setIsEdit] = useState(false);
  const state = useTodosState();
  const dispatch = useTodosDispatch();
  const todo = state.todos.find((todo) => todo.id === id);
  const { setValue: setTitle, ...titleInputProps } = useInput(todo?.title);
  const { setValue: setContent, ...contentInputProps } = useInput(
    todo?.content
  );

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
      titleInputProps.value !== todo.title ||
      contentInputProps.value !== todo.content
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

    mutate<{ title: string; content: string }, { data: Todo }>({
      url: join(API_PATH.TODO, "/", id),
      method: "put",
      body: { title: titleInputProps.value, content: contentInputProps.value },
      onSuccess: ({ data: todo }) => {
        dispatch({ type: "UPDATE_TODO", payload: { todo } });
      },
      onFinally: () => {
        setIsEdit(false);
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>Todo 상세</h1>
      <button className={styles.closeButton} onClick={onClickMoveHome}>
        ❌
      </button>
      <form className={styles.form} onSubmit={onSubmitTodoEdit}>
        <div className={styles.inputBox}>
          <label className={styles.label}>제목</label>
          <input
            className={styles.input}
            type="text"
            {...titleInputProps}
            disabled={!isEdit}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>내용</label>
          <input
            className={styles.input}
            type="text"
            {...contentInputProps}
            disabled={!isEdit}
          />
        </div>
        {isEdit ? (
          <>
            <div className={styles.button} onClick={onClickCancelEdit}>
              취소
            </div>
            <button className={styles.button} type="submit">
              저장
            </button>
          </>
        ) : (
          <div className={styles.button} onClick={onClickToggleEdit}>
            수정
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoDetail;
