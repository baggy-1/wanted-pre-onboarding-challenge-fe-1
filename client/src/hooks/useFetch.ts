import axios from "axios";
import { useEffect, useState } from "react";

interface Cache {
  [key: string]: unknown;
}

interface Config {
  [key: string]: unknown;
}

const cache: Cache = {};

const useFetch = <T>(url: string, config: Config) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    if (!reFetch && cache[url]) {
      setData(cache[url] as T);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const {
          data: { data },
        }: { data: { data: T } } = await axios.get(url, config);

        setData(data);
        cache[url] = data;
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
