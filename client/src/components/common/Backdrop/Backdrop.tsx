type Opacity = "none" | "low" | "medium" | "high";

interface Props {
  onClick: (...args: unknown[]) => void;
  opacity?: Opacity;
}

const bgColor = {
  none: "bg-[rgba(0,0,0,0)]",
  low: "bg-[rgba(0,0,0,0.3)]",
  medium: "bg-[rgba(0,0,0,0.5)]",
  high: "bg-[rgba(0,0,0,0.7)]",
};

const getClassName = (opacity: Opacity) =>
  `fixed top-0 left-0 right-0 bottom-0 w-full h-full ${bgColor[opacity]} z-0`;

const Backdrop = ({ onClick, opacity = "medium" }: Props) => {
  return (
    <div
      className={getClassName(opacity)}
      onClick={onClick}
      data-testid="backdrop"
    />
  );
};

export default Backdrop;
