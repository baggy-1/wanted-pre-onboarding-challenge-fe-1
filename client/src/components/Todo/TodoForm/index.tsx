import useCreateTodo from "@/hooks/useCreateTodo";
import useInput from "@/hooks/useInput";
import { FormEvent } from "react";
import styles from "./TodoForm.module.css";

interface Props {
  refetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoForm = ({ refetch }: Props) => {
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
  const { createTodo } = useCreateTodo();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ([title, content].includes("")) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    createTodo({
      todoBody: { title, content },
      onSuccess: () => {
        refetch(true);
      },
      onFinally: () => {
        setTitle("");
        setContent("");
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputBox}>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder="제목"
        />
      </div>
      <div className={styles.inputBox}>
        <label>내용</label>
        <input
          type="text"
          value={content}
          onChange={onChangeContent}
          placeholder="내용"
        />
      </div>
      <button className={styles.button} type="submit">
        Todo 추가
      </button>
    </form>
  );
};

export default TodoForm;
