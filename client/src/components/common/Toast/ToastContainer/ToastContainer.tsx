import Toast from "../Toast";
import useToastContainer from "./hooks/useToastContainer";

const ToastContainer = () => {
  const { getToastToRender } = useToastContainer();

  return (
    <div className="fixed bottom-[1rem] left-[1rem] w-auto h-auto flex flex-col items-end justify-center">
      {getToastToRender((position, toastList) => {
        return (
          <div
            className={`flex flex-col gap-4 ${position}`}
            key={`c${position}`}
          >
            {toastList.map(({ content, props }) => {
              return (
                <Toast {...props} key={props.toastId}>
                  {content}
                </Toast>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
