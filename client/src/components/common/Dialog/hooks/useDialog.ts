import { useState } from "react";
import type { DialogProps } from "../types";

type Callback = (args: DialogProps & { onToggle: () => void }) => JSX.Element;

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const getDialogToRender = (callback: Callback) => {
    return callback({ isOpen, onClose: handleClose, onToggle: handleToggle });
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
    getDialogToRender,
  };
};

export default useDialog;
