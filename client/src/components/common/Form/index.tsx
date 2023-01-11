import styles from "./Form.module.css";
import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

const InputWrapper = ({ children, ...otherProps }: InputWrapperProps) => {
  return (
    <div className={styles.inputBox} {...otherProps}>
      {children}
    </div>
  );
};

const Input = ({
  children,
  type,
  label: placeholder,
  ...otherProps
}: InputProps) => {
  return <input type={type} placeholder={placeholder} {...otherProps} />;
};

const Label = ({ children, ...otherProps }: LabelProps) => {
  return <label {...otherProps}>{children}</label>;
};

const Button = ({ children, type, ...otherProps }: ButtonProps) => {
  return (
    <button type={type} {...otherProps}>
      {children}
    </button>
  );
};

Form.InputWrapper = InputWrapper;
Form.Input = Input;
Form.Label = Label;
Form.Button = Button;

export default Form;
