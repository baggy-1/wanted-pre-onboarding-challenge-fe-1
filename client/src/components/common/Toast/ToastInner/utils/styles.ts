import { TypeOptions } from "../../types";

export const getBoxClassName = (type: TypeOptions) => {
  const defaultClassName =
    "w-80 h-auto min-h-[4rem] rounded-[4px] p-2 flex items-center justify-start shadow-lg relative";

  switch (type) {
    case "success":
      return `${defaultClassName} bg-green-600`;
    case "error":
      return `${defaultClassName} bg-red-600`;
    case "warning":
      return `${defaultClassName} bg-yellow-600`;
    case "info":
    default:
      return `${defaultClassName} bg-blue-600`;
  }
};
