interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DialogButton = ({ children, ...props }: Props) => {
  return <button {...props}>{children}</button>;
};

export default DialogButton;
