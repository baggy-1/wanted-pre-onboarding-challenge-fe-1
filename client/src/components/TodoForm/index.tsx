import { authInstance } from "@/api/interceptor";
import { API_PATH } from "@/const";
import useInput from "@/hooks/useInput";
import useMutation from "@/hooks/useMutation";
import { useTodosDispatch } from "@/provider/todos";
import { TodoResponse } from "@/types";
import { confirm } from "@/util";
import { FormEvent } from "react";
import Form from "@/components/common/Form";

const TodoForm = () => {
  const {
    others: { setValue: setTitle },
    props: titleProps,
  } = useInput();
  const {
    others: { setValue: setContent },
    props: contentProps,
  } = useInput();
  const { mutate } = useMutation(authInstance);
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

    if (isSomeEmpty(titleProps.value, contentProps.value)) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!confirm("Todo를 추가하시겠습니까?")) {
      return;
    }

    mutate<TodoResponse>({
      url: API_PATH.TODO,
      method: "post",
      body: {
        title: titleProps.value,
        content: contentProps.value,
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
    <Form onSubmit={onSubmit}>
      <Form.InputWrapper>
        <Form.Label>제목</Form.Label>
        <Form.Input label="제목" {...titleProps}></Form.Input>
      </Form.InputWrapper>
      <Form.InputWrapper>
        <Form.Label>내용</Form.Label>
        <Form.Input label="내용" {...contentProps}></Form.Input>
      </Form.InputWrapper>
      <Form.Button type="submit">Todo 추가</Form.Button>
    </Form>
  );
};

export default TodoForm;
