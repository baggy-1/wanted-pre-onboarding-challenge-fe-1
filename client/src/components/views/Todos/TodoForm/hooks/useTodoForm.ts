import { CACHE_KEY } from "@/services/cacheKeys";
import { addTodo } from "@/services/todos";
import { TodoParmas } from "@/types/todos";
import useInput from "@/utils/hooks/useInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useTodoForm = () => {
  const client = useQueryClient();
  const {
    others: { setValue: setTitle },
    props: titleProps,
  } = useInput();
  const {
    others: { setValue: setContent },
    props: contentProps,
  } = useInput();
  const { mutate } = useMutation((params: TodoParmas) => addTodo(params), {
    onSuccess: () => {
      client.invalidateQueries(CACHE_KEY.todos);
    },
  });

  const clearInput = () => {
    setTitle("");
    setContent("");
  };

  const isSomeEmpty = (...values: string[]) => {
    return values.some((value) => value === "");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    clearInput();
  };

  return { onSubmit, titleProps, contentProps };
};

export default useTodoForm;
