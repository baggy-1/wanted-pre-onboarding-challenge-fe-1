import { Position } from "../../types";
import Icons from "../../Icons";
import { Options } from "../../types";

export const getPositionClassName = (position: Position) => {
  switch (position) {
    case "top-left":
      return "top-[1rem] left-[1rem]";
    case "top-center":
      return "top-[1rem] left-[50%] transform -translate-x-1/2";
    case "bottom-left":
      return "bottom-[1rem] left-[1rem]";
    case "bottom-center":
      return "bottom-[1rem] left-[50%] transform -translate-x-1/2";
    case "bottom-right":
      return "bottom-[1rem] right-[1rem]";
    case "top-right":
    default:
      return "top-[1rem] right-[1rem]";
  }
};

export const getIcon = (options: Options) => {
  const { type } = options;
  switch (type) {
    case "success":
      return Icons.success();
    case "error":
      return Icons.error();
    case "info":
      return Icons.info();
    case "warning":
      return Icons.warning();
    default:
      return Icons.default();
  }
};
