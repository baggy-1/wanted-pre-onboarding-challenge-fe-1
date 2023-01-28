import Dialog from "@/components/common/Dialog";
import useDialog from "@/components/common/Dialog/hooks/useDialog";
import Form from "@/components/common/Form";
import { toast } from "@/components/common/Toast";
import useTodoMutation from "@/services/todos/hooks/useTodoMutation";
import useInput from "@/utils/hooks/useInput";
import { FormEvent, useState } from "react";

const TodoFormContainer = () => {
  const {
    others: { setValue: setTitle },
    props: titleProps,
  } = useInput();
  const {
    others: { setValue: setContent },
    props: contentProps,
  } = useInput();
  const { createMutate } = useTodoMutation();
  const { isOpen, handleToggle } = useDialog();

  const clearInput = () => {
    setTitle("");
    setContent("");
  };

  const isSomeEmpty = (...values: string[]) => {
    return values.some((value) => value === "");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSomeEmpty(titleProps.value, contentProps.value)) {
      toast("제목과 내용을 모두 입력해주세요.", { type: "warning" });
      return;
    }

    handleToggle();
  };

  const onClickCreateTodo = () => {
    createMutate({
      title: titleProps.value,
      content: contentProps.value,
    });
    clearInput();
    handleToggle();
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center w-full gap-4">
        <div className="flex flex-col w-full max-w-lg gap-4">
          <Form.Input
            type="text"
            name="title"
            label="제목"
            {...titleProps}
          ></Form.Input>
          <Form.Input
            type="text"
            name="content"
            label="내용"
            {...contentProps}
          ></Form.Input>
        </div>
        <Form.Button
          className="w-24 h-12 border rounded-md hover:bg-blue-500 hover:text-white"
          type="submit"
        >
          Todo 추가
        </Form.Button>
      </div>
      <Dialog isOpen={isOpen} onClose={handleToggle}>
        <Dialog.Title>정말 추가하시겠습니까?</Dialog.Title>
        <Dialog.Content>Todo를 추가하려면 추가를 눌러주세요.</Dialog.Content>
        <Dialog.Actions>
          <Dialog.Button data-testid="create-cancel" onClick={handleToggle}>
            취소
          </Dialog.Button>
          <button
            data-testid="create-submit"
            type="button"
            onClick={onClickCreateTodo}
            autoFocus
          >
            추가
          </button>
        </Dialog.Actions>
      </Dialog>
    </form>
  );
};

export default TodoFormContainer;
