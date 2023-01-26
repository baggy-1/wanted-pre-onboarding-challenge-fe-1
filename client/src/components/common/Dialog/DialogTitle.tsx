interface Props {
  children: React.ReactNode;
}

const DialogTitle = ({ children }: Props) => {
  return <div className="font-bold text-lg">{children}</div>;
};

export default DialogTitle;
