interface Props {
  children: React.ReactNode;
}

const DialogContent = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default DialogContent;
