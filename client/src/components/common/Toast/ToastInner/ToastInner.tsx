import { ToastProps } from "../types";
import useToastInner from "./hooks/useToastInner";

interface Props extends ToastProps {
  children: React.ReactNode;
}

const ToastInner = ({ children, ...props }: Props) => {
  // Todo: type에 따라 다른 스타일 적용 & icon
  const { type, iconOut } = props;
  const { toastRef, handleCloseToast } = useToastInner(props);

  return (
    <div
      className="w-auto min-w-[20rem] h-auto min-h-[4rem] bg-white rounded-[4px] p-2 flex items-center justify-start shadow-lg relative"
      onClick={handleCloseToast}
      ref={toastRef}
    >
      <div>{iconOut}</div>
      <div className="p-[6px]">{children}</div>
      <div
        className="absolute bottom-0 left-0 w-full bg-black h-1 animate-progress-bar origin-left"
        onAnimationEnd={handleCloseToast}
      ></div>
    </div>
  );
};

export default ToastInner;
