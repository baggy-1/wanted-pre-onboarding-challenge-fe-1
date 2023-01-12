import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface LinkProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  href: string;
}

const Todo = ({ children }: Props) => {
  return (
    <div className="relative flex items-center justify-between w-full h-12 p-2 border-t border-b hover:bg-blue-500 hover:text-white">
      {children}
    </div>
  );
};

const Title = ({ children, ...otherProps }: TitleProps) => {
  return (
    <div
      className="h-auto overflow-hidden break-all w-36 whitespace-nowrap text-ellipsis"
      {...otherProps}
    >
      {children}
    </div>
  );
};

const Button = ({ children, onClick, ...otherProps }: ButtonProps) => {
  return (
    <button className="rounded-full" onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

const Link = ({ children, href, ...otherProps }: LinkProps) => {
  const navigate = useNavigate();
  const onClickMoveHref = (href: string) => () => {
    navigate(href);
  };

  return (
    <div
      className="cursor-pointer"
      onClick={onClickMoveHref(href)}
      {...otherProps}
    >
      {children}
    </div>
  );
};

Todo.Title = Title;
Todo.Button = Button;
Todo.Link = Link;

export default Todo;
