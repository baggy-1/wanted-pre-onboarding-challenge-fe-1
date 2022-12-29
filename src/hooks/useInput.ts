import { ChangeEvent, useEffect, useState } from "react";

const useInput = (initValue: string) => {
  const [value, setValue] = useState(initValue);
  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  return { value, onChange, setValue };
};

export default useInput;
