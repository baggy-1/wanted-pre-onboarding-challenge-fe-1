export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface Options {
  type: TypeOptions;
  toastId: string;
  position: Position;
}

export type TypeOptions = "success" | "error" | "info" | "warning" | "default";

export type Content = string;

export type ToastId = string;

export interface ToastProps extends Options {
  closeToast: () => void;
  iconOut: string;
}

export interface ToastInfo {
  content: Content;
  props: ToastProps;
}
