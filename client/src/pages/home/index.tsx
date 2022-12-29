import { FormEvent } from "react";
import axios from "axios";
import useInput from "@/hooks/useInput";
import { Outlet, useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { Todo } from "@/types";
import styles from "./Home.module.css";
import { API_URL, PAGE_PATH } from "@/const";
import { getToken, join } from "@/util";

const Home = () => {
  const navigate = useNavigate();
  const {
    data: todos,
    isLoading,
    isError,
    setReFetch,
  } = useFetch<Todo[]>(API_URL.TODO, {
    headers: { Authorization: getToken() },
  });
  const {
    value: title,
    onChange: onChangeTitle,
    setValue: setTitle,
  } = useInput("");
  const {
    value: content,
    onChange: onChangeContent,
    setValue: setContent,
  } = useInput("");

  const onClickTodo = (id: string) => () => {
    navigate(`${PAGE_PATH.TODOS}/${id}`);
  };

  const onClickDeleteTodo = (id: string) => async () => {
    try {
      await axios.delete(join(API_URL.TODO, "/", id), {
        headers: {
          Authorization: getToken(),
        },
      });

      setReFetch(true);
      navigate(PAGE_PATH.HOME, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ([title, content].includes("")) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const body = {
        title,
        content,
      };

      await axios.post(API_URL.TODO, body, {
        headers: {
          Authorization: getToken(),
        },
      });

      setReFetch(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTitle("");
      setContent("");
    }
  };

  if (isError) {
    return <div>알 수 없는 에러가 발생했습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder="제목"
        />
        <label>내용</label>
        <input
          type="text"
          value={content}
          onChange={onChangeContent}
          placeholder="내용"
        />
        <button type="submit">Todo 추가</button>
      </form>
      <div className={styles.todoSection}>
        <div className={styles.todoBox}>
          <h1>Todo 목록</h1>
          {isLoading ? (
            <div>로딩중...</div>
          ) : (
            todos &&
            (todos.length === 0 ? (
              <div>Todo가 없습니다.</div>
            ) : (
              todos.map(({ id, title }) => (
                <div key={id}>
                  <h3 onClick={onClickTodo(id)}>{title}</h3>
                  <button onClick={onClickDeleteTodo(id)}>삭제</button>
                </div>
              ))
            ))
          )}
        </div>
        <Outlet context={{ setReFetch }} />
      </div>
    </div>
  );
};

export default Home;
