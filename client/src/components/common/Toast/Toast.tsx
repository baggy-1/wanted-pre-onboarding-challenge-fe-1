import { ToastProps } from "./types";

interface Props extends ToastProps {
  children: React.ReactNode;
}

const Toast = ({ children, ...props }: Props) => {
  // Todo: type에 따라 다른 스타일 적용 & icon
  const { type, closeToast } = props;
  console.log(type, closeToast);

  return (
    <div
      className="w-auto min-w-[20rem] h-auto min-h-[4rem] bg-white rounded-[4px] p-2 flex items-center justify-start shadow-lg"
      onClick={closeToast}
    >
      <div className="p-[6px]">{children}</div>
    </div>
  );
};

export default Toast;
