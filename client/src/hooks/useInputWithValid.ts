import { ChangeEvent, useState } from "react";

type ValueType = "EMAIL" | "PASSWORD";

const regExp = {
  EMAIL: /(?=.*@)(?=.*\.).*/,
  PASSWORD: /^.{8,}$/,
};

const isValid = (value: string, type: ValueType) => {
  return regExp[type].test(value);
};

const useInputWithValid = (initValue: string, type: ValueType) => {
  const [value, setValue] = useState(initValue);
  const [isValidValue, setIsValidValue] = useState(false);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    setIsValidValue(isValid(value, type));
  };

  return { value, onChange, isValid: isValidValue };
};

export default useInputWithValid;
