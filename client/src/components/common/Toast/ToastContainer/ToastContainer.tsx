import ToastInner from "../ToastInner";
import useToastContainer from "./hooks/useToastContainer";

const ToastContainer = () => {
  const { getToastToRender } = useToastContainer();

  return (
    <div className="fixed top-[1rem] right-[1rem] w-auto h-auto flex flex-col items-end justify-center z-[999]">
      {getToastToRender((position, toastList) => {
        return (
          <div
            className={`flex flex-col gap-4 ${position}`}
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
