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

const useQuery = <T>(url: string, options?: Options<T>) => {
  const [data, setData] = useState<T>();
  const [isError, setisError] = useState(false);

  useEffect(() => {
    getData<T>(url)
      .then(({ data }) => {
        setData(data);
        options?.onSuccess?.(data);
      })
      .catch((error) => {
        console.error(error);
        setisError(true);
        options?.onError?.(error);
      })
      .finally(() => {
        options?.onFinally?.();
      });
  }, []);

  return {
    data,
    isLoading: !isError && !data,
    isError,
  };
};

export default useQuery;
