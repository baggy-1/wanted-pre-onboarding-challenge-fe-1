import useInput from "@/utils/hooks/useInput";
import useMutation from "@/utils/hooks/useMutation";
import { useTodosDispatch } from "@/providers/todos";
import { TodoParmas } from "@/types/todos";
import { confirm } from "@/utils";
import { FormEvent } from "react";
import Form from "@/components/common/Form";
import { addTodo } from "@/services/todos";

const TodoFormContainer = () => {
  const {
    others: { setValue: setTitle },
    props: titleProps,
  } = useInput();
  const {
    others: { setValue: setContent },
    props: contentProps,
  } = useInput();
  const { mutate } = useMutation({
    mutationFn: (params: TodoParmas) => addTodo(params),
    onSuccess: ({ data: todo }) => {
      dispatch({ type: "ADD_TODO", payload: { todo } });
    },
    onFinally: () => {
      clearInput();
    },
  });
  const dispatch = useTodosDispatch();

  const clearInput = () => {
    setTitle("");
    setContent("");
  };

  const isSomeEmpty = (...values: string[]) => {
    return values.some((value) => value === "");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSomeEmpty(titleProps.value, contentProps.value)) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!confirm("Todo를 추가하시겠습니까?")) {
      return;
    }

    mutate({
      title: titleProps.value,
      content: contentProps.value,
    });
  };

  return (
    <Form
      className="flex flex-col items-center justify-center w-full h-full"
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-center w-full gap-4">
        <div className="flex flex-col w-full max-w-lg gap-4">
          <Form.Input label="제목" {...titleProps}></Form.Input>
          <Form.Input label="내용" {...contentProps}></Form.Input>
        </div>
        <Form.Button
          className="w-24 h-12 border rounded-md hover:bg-blue-500 hover:text-white"
          type="submit"
        >
          Todo 추가
        </Form.Button>
      </div>
    </Form>
  );
};

export default TodoFormContainer;
