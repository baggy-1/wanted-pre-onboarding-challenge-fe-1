interface Props {
  children: React.ReactNode;
}

interface ChildrenProps {
  children: React.ReactNode;
}

interface OnClickProps {
  onClick: () => void;
}

const Todo = ({ children }: Props) => {
  return (
    <div className="relative flex items-center justify-between w-full h-12 p-2 border-t border-b hover:bg-blue-500 hover:text-white">
      {children}
    </div>
  );
};

const Title = ({ children, ...otherProps }: ChildrenProps) => {
  return (
    <div
      className="h-auto overflow-hidden break-all w-36 whitespace-nowrap text-ellipsis"
      {...otherProps}
    >
      {children}
    </div>
  );
};

const Button = ({
  children,
  onClick,
  ...otherProps
}: ChildrenProps & OnClickProps) => {
  return (
    <button className="rounded-full" onClick={onClick} {...otherProps}>
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
    <div className="cursor-pointer" onClick={onClick} {...otherProps}>
      {children}
    </div>
  );
};

Todo.Title = Title;
Todo.Button = Button;
Todo.Link = Link;

export default Todo;
