import { authInstance } from "@/api/interceptor";
import { Todo } from "@/types";

interface Post {
  method: "post";
  responseData: { data: Todo };
  requestData: Pick<Todo, "title" | "content">;
}

interface Put {
  method: "put";
  responseData: { data: Todo };
  requestData: Pick<Todo, "title" | "content">;
}

interface Delete {
  method: "delete";
  responseData: { data: null };
  requestData: null;
}

type Method = Post["method"] | Put["method"] | Delete["method"];

type data = Post | Put | Delete;
type ResponseData = data["method"] extends Method
  ? data["responseData"]
  : never;
type Body = data["method"] extends Method ? data["requestData"] : never;

interface mutateTodoParams {
  url: string;
  method: Method;
  body: Body;
  confirmText: string;
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

const useMutationTodo = () => {
  const mutateTodo = async ({
    url,
    method,
    body,
    confirmText,
    onSuccess,
    onError,
    onFinally,
  }: mutateTodoParams) => {
    const isConfirm = window.confirm(confirmText);
    if (!isConfirm) {
      return;
    }

    try {
      const { data } = await authInstance<ResponseData>({
        method,
        data: body,
        url,
      });
      onSuccess?.(data);
    } catch (error) {
      console.error(error);
      onError?.(error);
    } finally {
      onFinally?.();
    }
  };

  return { mutateTodo };
};

export default useMutationTodo;
