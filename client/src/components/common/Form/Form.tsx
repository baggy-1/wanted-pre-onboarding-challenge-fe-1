import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string;
  value: string;
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Form = ({ children, onSubmit, className }: FormProps) => {
  return (
    <form
      className={
        className ||
        "flex flex-col justify-center items-center w-full max-w-[15rem] h-auto gap-2"
      }
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

const Input = ({
  children,
  className,
  type,
  label: placeholder,
  name,
  ...otherProps
}: InputProps) => {
  return (
    <input
      className={className || "w-full border rounded-sm min-h-[1rem]"}
      type={type}
      name={name}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

const Label = ({ children, ...otherProps }: LabelProps) => {
  return <label {...otherProps}>{children}</label>;
};

const Button = ({ children, className, type, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={
        className ||
        "flex items-center justify-center w-full h-8 border rounded-lg cursor-pointer disabled:bg-white bg-blue-500 text-white disabled:text-black disabled:cursor-not-allowed"
      }
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
};

const Notice = ({ children, className, ...otherProps }: NoticeProps) => {
  return (
    <div
      className={
        className || "w-full h-auto min-h-[1rem] text-xs text-red-500 font-bold"
      }
      {...otherProps}
    >
      {children}
    </div>
  );
};

Form.Input = Input;
Form.Label = Label;
Form.Button = Button;
Form.Notice = Notice;

export default Form;
