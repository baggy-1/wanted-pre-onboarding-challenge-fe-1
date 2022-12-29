import { FormEvent } from "react";
import getToken from "@/pages/auth/util/getToken";
import axios from "axios";
import useInput from "@/hooks/useInput";
import { Outlet, useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { Todo } from "@/type";
import styles from "./Home.module.css";

const TODOS_URL = `${import.meta.env.VITE_API_BASE_URL}/todos`;

const Home = () => {
  const navigate = useNavigate();
  const {
    data: todos,
    isLoading,
    isError,
    setReFetch,
  } = useFetch<Todo[]>(TODOS_URL, { headers: { Authorization: getToken() } });
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
    navigate(`/todos/${id}`);
  };

  const onClickDeleteTodo = (id: string) => async () => {
    try {
      await axios.delete(`${TODOS_URL}/${id}`, {
        headers: {
          Authorization: getToken(),
        },
      });

      setReFetch(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const body = {
        title,
        content,
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/todos`, body, {
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
            todos.map(({ id, title }) => (
              <div key={id}>
                <h3 onClick={onClickTodo(id)}>{title}</h3>
                <button onClick={onClickDeleteTodo(id)}>삭제</button>
              </div>
            ))
          )}
        </div>
        <Outlet context={{ setReFetch }} />
      </div>
    </div>
  );
};

export default Home;
