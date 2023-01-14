import { AxiosResponse } from "axios";
import { useState } from "react";
interface Options<T, P> {
  mutationFn: (params: P) => Promise<AxiosResponse<T>>;
  onSuccess?: (responseData: T, requestData: P) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

const useMutation = <T = unknown, P = void>({
  mutationFn,
  onSuccess,
  onError,
  onFinally,
}: Options<T, P>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const mutate = async (params: P) => {
    try {
      setIsLoading(true);
      const { data } = await mutationFn(params);
      setIsError(false);
      onSuccess?.(data, params);
    } catch (error) {
      console.error(error);
      setIsError(true);
      onError?.(error);
    } finally {
      setIsLoading(false);
      onFinally?.();
    }
  };

  return { mutate, isLoading, isError };
};

export default useMutation;
