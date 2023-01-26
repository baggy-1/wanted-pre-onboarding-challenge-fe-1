interface Props {
  onClick: (...args: unknown[]) => void;
}

const Backdrop = ({ onClick }: Props) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-0"
      onClick={onClick}
      data-testid="backdrop"
    />
  );
};

export default Backdrop;
