import ToastInner from "../ToastInner";
import useToastContainer from "./hooks/useToastContainer";
import { getPositionClassName } from "./utils";

const ToastContainer = () => {
  const { getToastToRender } = useToastContainer();

  return (
    <div className="w-auto h-auto flex flex-col items-end justify-center">
      {getToastToRender((position, toastList) => {
        return (
          <div
            className={`fixed flex flex-col gap-4 ${getPositionClassName(
              position
            )} z-[999]`}
            key={`c${position}`}
          >
            {toastList.map(({ content, props }) => {
              return (
                <ToastInner {...props} key={props.toastId}>
                  {content}
                </ToastInner>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
