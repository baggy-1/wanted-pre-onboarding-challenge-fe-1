import useFetch from "@/hooks/useFetch";
import { Todo } from "@/type";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import getToken from "@/pages/auth/util/getToken";
import styles from "./TodoDetail.module.css";
import useInput from "@/hooks/useInput";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import axios from "axios";

const TODO_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/todos`;

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setReFetch: setTodoListReFetch } = useOutletContext<{
    setReFetch: Dispatch<SetStateAction<boolean>>;
  }>();
  const [isEdit, setIsEdit] = useState(false);
  const {
    data: todo,
    isLoading,
    isError,
    setReFetch,
  } = useFetch<Todo>(`${TODO_BASE_URL}/${id}`, {
    headers: { Authorization: getToken() },
  });
  const { value: title, onChange: onChangeTitle } = useInput(todo?.title || "");
  const { value: content, onChange: onChangeContent } = useInput(
    todo?.content || ""
  );

  const onClickToggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickMoveHome = () => {
    navigate("/");
  };

  const onSubmitTodoEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === todo?.title && content === todo?.content) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      const body = {
        title,
        content,
      };

      await axios.put(`${TODO_BASE_URL}/${id}`, body, {
        headers: {
          Authorization: getToken(),
        },
      });

      setReFetch(true);
      setTodoListReFetch(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEdit(false);
    }
  };

  if (isError) {
    return (
      <div>
        <div>알 수 없는 에러가 발생했습니다.</div>
        <button onClick={onClickMoveHome}>메인으로 가기</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Todo 상세</h1>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <form onSubmit={onSubmitTodoEdit}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={onChangeTitle}
            disabled={!isEdit}
          />
          <label>내용</label>
          <input
            type="text"
            value={content}
            onChange={onChangeContent}
            disabled={!isEdit}
          />
          {!isEdit && <div onClick={onClickToggleEdit}>수정</div>}
          {isEdit && (
            <div>
              <div onClick={onClickToggleEdit}>취소</div>
              <button type="submit">저장</button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default TodoDetail;
