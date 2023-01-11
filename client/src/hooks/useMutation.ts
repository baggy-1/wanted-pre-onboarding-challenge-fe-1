import { authInstance } from "@/api/interceptor";

type Method = "POST" | "PUT" | "DELETE";
interface mutateParams<Body, Response> {
  url: string;
  method: Lowercase<Method>;
  body?: Body;
  onSuccess?: (data: Response) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

const useMutation = () => {
  const mutate = async <Body, Response>({
    url,
    method,
    body,
    onSuccess,
    onError,
    onFinally,
  }: mutateParams<Body, Response>) => {
    try {
      const { data } = await authInstance<Response>({
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
