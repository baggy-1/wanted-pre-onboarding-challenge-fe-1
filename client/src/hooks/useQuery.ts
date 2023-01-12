import { authInstance } from "@/api/interceptor";
import { useEffect, useState } from "react";

interface Options<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

const getData = async <T>(url: string) => {
  return await authInstance.get<T>(url);
};

const useQuery = <T>(
  url: string,
  { onSuccess, onError, onFinally }: Options<T> = {}
) => {
  const [data, setData] = useState<T>();
  const [isError, setisError] = useState(false);

  useEffect(() => {
    getData<T>(url)
      .then(({ data }) => {
        setData(data);
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
