import { PAGE_PATH } from "@/constants";
import { CACHE_KEY } from "@/services/cacheKeys";
import { deleteTodo, updateTodo } from "@/services/todos";
import { Todo, UpdateTodoParams } from "@/types/todos";
import useInput from "@/utils/hooks/useInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useTodoDetail = (todo: Todo) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const {
    others: { setValue: setTitle },
    props: titleProps,
  } = useInput({ initValue: todo.title });
  const {
    others: { setValue: setContent },
    props: contentProps,
  } = useInput({ initValue: todo.content });

  const client = useQueryClient();

  const { mutate: updateMutate } = useMutation(
    (params: UpdateTodoParams) => updateTodo(params),
    {
      onSuccess: () => {
        client.invalidateQueries(CACHE_KEY.todos);
      },
    }
  );
  const { mutate: deleteMutate } = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      client.invalidateQueries(CACHE_KEY.todos);
    },
  });

  const onClickDeleteTodo = (id: string) => () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    deleteMutate(id);
    navigate(PAGE_PATH.HOME, { replace: true });
  };

  const isUpdateInputValues = () => {
    return (
      titleProps.value !== todo.title || contentProps.value !== todo.content
    );
  };

  const onSubmitTodoEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isUpdateInputValues()) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    if (!confirm("정말 수정하시겠습니까?")) {
      return;
    }

    updateMutate({
      id: todo.id,
      title: titleProps.value,
      content: contentProps.value,
    });
    setIsEdit(false);
  };

  const onClickToggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const setPrevTodoValues = () => {
    const { title, content } = todo;
    setTitle(title);
    setContent(content);
  };

  const onClickCancelEdit = () => {
    setPrevTodoValues();
    onClickToggleEdit();
  };

  return {
    isEdit,
    titleProps,
    contentProps,
    onClickDeleteTodo,
    onSubmitTodoEdit,
    onClickToggleEdit,
    onClickCancelEdit,
  };
};

export default useTodoDetail;
