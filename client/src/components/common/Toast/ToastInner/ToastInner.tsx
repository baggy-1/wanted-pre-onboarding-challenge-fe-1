import { ToastProps, TypeOptions } from "../types";
import useToastInner from "./hooks/useToastInner";
import { getBoxClassName } from "./utils";

interface Props extends ToastProps {
  children: React.ReactNode;
}

const ToastInner = ({ children, ...props }: Props) => {
  // Todo: type에 따라 다른 스타일 적용 & icon
  const { type, iconOut } = props;
  const { toastRef, handleCloseToast } = useToastInner(props);

  return (
    <div
      className={getBoxClassName(type)}
      onClick={handleCloseToast}
      ref={toastRef}
    >
      <div>{iconOut}</div>
      <div className="p-[6px] break-keep w-full h-full">{children}</div>
      <div
        className="absolute bottom-0 left-0 w-full bg-black h-1 animate-progress-bar origin-left"
        onAnimationEnd={handleCloseToast}
      />
    </div>
  );
};

export default ToastInner;
