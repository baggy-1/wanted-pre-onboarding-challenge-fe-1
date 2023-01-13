import { ChangeEvent, useEffect, useState } from "react";
interface Props {
  initValue?: string;
  isValid?: (value: string) => boolean;
}

const useInput = ({ initValue = "", isValid }: Props = {}) => {
  const [value, setValue] = useState(initValue);
  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  return {
    props: { value, onChange },
    others: { setValue, isValid: isValid?.(value) },
  };
};

export default useInput;
