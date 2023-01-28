import { Event, Type } from "./constants";
import { Content, Options, TypeOptions } from "./types";
import eventManager from "./utils/eventManager";

let TOAST_ID = 1;

const generateToastId = () => {
  return `${TOAST_ID++}`;
};

const getToastId = (options?: Partial<Options>) => {
  return options?.toastId || generateToastId();
};

const mergeOptions = (type: TypeOptions, options?: Partial<Options>) => {
  return {
    ...options,
    type: options?.type || type,
    toastId: getToastId(options),
    position: options?.position || "bottom-left",
  };
};

const toast = (content: Content, options?: Partial<Options>) => {
  eventManager.emit(Event.show, content, mergeOptions(Type.DEFAULT, options));
};

export default toast;
