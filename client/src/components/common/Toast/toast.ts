import { Event, Type } from "./constants";
import { Content, Options, TypeOptions } from "./types";
import eventManager from "./utils/eventManager";

let TOAST_ID = 1;

const generateToastId = () => {
  return `${TOAST_ID++}`;
};

const getToastId = (options?: Options) => {
  return options?.toastId || generateToastId();
};

const mergeOptions = (type: TypeOptions, options?: Options) => {
  return {
    ...options,
    type: options?.type || type,
    toastId: getToastId(options),
  };
};

const toast = (content: Content, options?: Options) => {
  eventManager.emit(Event.show, content, mergeOptions(Type.DEFAULT, options));
};

export default toast;
