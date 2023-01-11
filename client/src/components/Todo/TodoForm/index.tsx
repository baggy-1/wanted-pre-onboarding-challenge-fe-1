import { API_PATH } from "@/const";
import useInput from "@/hooks/useInput";
import useMutationTodo from "@/hooks/useMutationTodo";
import { useTodosDispatch } from "@/provider/todos";
import { Todo } from "@/types";
import { confirm } from "@/util";
import { FormEvent } from "react";
import styles from "./TodoForm.module.css";

const TodoForm = () => {
  const { setValue: setTitle, ...titleInputProps } = useInput("");
  const { setValue: setContent, ...contentInputProps } = useInput("");
  const { mutateTodo } = useMutationTodo<{ data: Todo }>();
  const dispatch = useTodosDispatch();

  const clearInput = () => {
    setTitle("");
    setContent("");
  };

  const isSomeEmpty = (...values: string[]) => {
    return values.some((value) => value === "");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSomeEmpty(titleInputProps.value, contentInputProps.value)) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!confirm("Todo를 추가하시겠습니까?")) {
      return;
    }

    mutateTodo({
      url: API_PATH.TODO,
      method: "post",
      body: {
        title: titleInputProps.value,
        content: contentInputProps.value,
      },
      onSuccess: ({ data: todo }) => {
        dispatch({ type: "ADD_TODO", payload: { todo } });
      },
      onFinally: () => {
        clearInput();
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputBox}>
        <label>제목</label>
        <input type="text" {...titleInputProps} placeholder="제목" />
      </div>
      <div className={styles.inputBox}>
        <label>내용</label>
        <input type="text" {...contentInputProps} placeholder="내용" />
      </div>
      <button className={styles.button} type="submit">
        Todo 추가
      </button>
    </form>
  );
};

export default TodoForm;
