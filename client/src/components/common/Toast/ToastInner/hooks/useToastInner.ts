import { useLayoutEffect, useRef } from "react";
import { ToastProps } from "../../types";

const useToastInner = ({ closeToast }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);

  const handleCloseToast = () => {
    const node = toastRef.current;
    if (!node) {
      return;
    }

    const onClosed = () => {
      closeToast();
      node.removeEventListener("animationend", onClosed);
    };

    node.classList.add("animate-fade-out-left");
    node.addEventListener("animationend", onClosed);
  };

  useLayoutEffect(() => {
    const node = toastRef.current;
    if (!node) {
      return;
    }

    const onEntered = () => {
      node.classList.remove("animate-fade-in-left");
      node.removeEventListener("animationend", onEntered);
    };

    const onEnter = () => {
      node.classList.add("animate-fade-in-left");
      node.addEventListener("animationend", onEntered);
    };

    onEnter();
  }, []);

  return {
    toastRef,
    handleCloseToast,
  };
};

export default useToastInner;
