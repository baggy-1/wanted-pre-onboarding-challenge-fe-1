import styles from "./Todo.module.css";

interface Props {
  children: React.ReactNode;
}

const Todo = ({ children }: Props) => {
  return <div className={styles.todoBox}>{children}</div>;
};

interface ChildrenProps {
  children: React.ReactNode;
}

interface OnClickProps {
  onClick: () => void;
}

const Title = ({ children, ...otherProps }: ChildrenProps) => {
  return <div {...otherProps}>{children}</div>;
};

const Button = ({
  children,
  onClick,
  ...otherProps
}: ChildrenProps & OnClickProps) => {
  return (
    <button onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

const Link = ({
  children,
  onClick,
  ...otherProps
}: ChildrenProps & OnClickProps) => {
  return (
    <div onClick={onClick} {...otherProps}>
      {children}
    </div>
  );
};

Todo.Title = Title;
Todo.Button = Button;
Todo.Link = Link;

export default Todo;
