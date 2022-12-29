import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = <T>(url: string, config: {}) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const {
          data: { data },
        }: { data: { data: T } } = await axios.get(url, config);

        setData(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
        setReFetch(false);
      }
    })();
  }, [url, reFetch]);

  return { data, isLoading, isError, setReFetch };
};

export default useFetch;
