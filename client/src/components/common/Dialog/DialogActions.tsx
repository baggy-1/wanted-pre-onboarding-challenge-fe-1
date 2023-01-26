interface Props {
  children: React.ReactNode;
}

const DialogActions = ({ children }: Props) => {
  return <div className="self-end flex gap-4">{children}</div>;
};

export default DialogActions;
