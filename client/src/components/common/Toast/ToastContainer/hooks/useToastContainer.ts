import { useEffect, useRef, useState } from "react";
import { Event } from "../../constants";
import {
  Content,
  Options,
  Position,
  ToastId,
  ToastInfo,
  ToastProps,
} from "../../types";
import eventManager from "../../utils/eventManager";

const getIcon = (options: Options) => {
  const { type } = options;
  switch (type) {
    case "success":
      return "성공";
    case "error":
      return "에러";
    case "info":
      return "정보";
    case "warning":
      return "경고";
    default:
      return "기본";
  }
};

const useToastContainer = () => {
  const [_, setToastIds] = useState<ToastId[]>([]);
  const toastToRender = useRef(new Map<ToastId, ToastInfo>()).current;

  useEffect(() => {
    eventManager.on(Event.show, buildToast);

    return () => {
      toastToRender.clear();
    };
  }, []);

  const removeToast = (toastId: ToastId) => {
    toastToRender.delete(toastId);
    setToastIds((prev) => prev.filter((id) => id !== toastId));
  };

  // toast 함수를 호출할 때, content, options를 받아서 appendToast를 실행하는 함수
  const buildToast = (content: Content, options: Options) => {
    const { toastId } = options;
    const closeToast = () => removeToast(toastId);
    const toastProps: ToastProps = {
      ...options,
      closeToast,
      iconOut: getIcon(options),
    };
    appendToast(content, toastProps);
  };

  const appendToast = (content: Content, toastProps: ToastProps) => {
    const { toastId } = toastProps;

    const toast: ToastInfo = {
      content,
      props: toastProps,
    };
    toastToRender.set(toastId, toast);
    setToastIds((prev) => [...prev, toastId]);
  };

  const getToastToRender = <T>(
    callback: (position: Position, toastList: ToastInfo[]) => T
  ) => {
    // position을 관리하기 위한 map
    const toRender = new Map<Position, ToastInfo[]>();
    // toastToRender에 있는 모든 toast
    const collection = Array.from(toastToRender.values());

    // collection을 순회하며 position을 기준으로 toRender에 추가
    collection.forEach((toast) => {
      const { position } = toast.props;
      toRender.has(position) || toRender.set(position, []);
      toRender.get(position)!.push(toast);
    });

    // position을 key로 가지는 toRender을 순회하며 callback 실행
    return Array.from(toRender, ([position, toast]) =>
      callback(position, toast)
    );
  };

  return {
    getToastToRender,
  };
};

export default useToastContainer;
