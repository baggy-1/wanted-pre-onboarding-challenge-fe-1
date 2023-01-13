import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface Options<T> {
  queryFn: () => Promise<AxiosResponse<T>>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

const useQuery = <T>({
  queryFn,
  onSuccess,
  onError,
  onFinally,
}: Options<T>) => {
  const [data, setData] = useState<T>();
  const [isError, setisError] = useState(false);

  useEffect(() => {
    queryFn()
      .then(({ data }) => {
        setData(data);
        setisError(false);
        onSuccess?.(data);
      })
      .catch((error) => {
        console.error(error);
        setisError(true);
        onError?.(error);
      })
      .finally(() => {
        onFinally?.();
      });
  }, []);

  return {
    data,
    isLoading: !isError && !data,
    isError,
  };
};

export default useQuery;
