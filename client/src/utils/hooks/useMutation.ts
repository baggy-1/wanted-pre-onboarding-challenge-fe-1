import axios, { AxiosInstance } from "axios";

type Method = "POST" | "PUT" | "DELETE";
interface mutateParams<T> {
  url: string;
  method: Lowercase<Method>;
  body?: unknown;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

const useMutation = (instance?: AxiosInstance) => {
  const _instance = instance || axios.create();

  const mutate = async <T>({
    url,
    method,
    body,
    onSuccess,
    onError,
    onFinally,
  }: mutateParams<T>) => {
    try {
      const { data } = await _instance<T>({
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

  return { mutate };
};

export default useMutation;
