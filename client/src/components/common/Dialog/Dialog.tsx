import Portal from "@/components/common/Portal";
import Backdrop from "@/components/common/Backdrop";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";
import DialogActions from "./DialogActions";
import DialogButton from "./DialogButton";
import type { DialogProps } from "./types";

type Props = DialogProps & React.PropsWithChildren;

const DialogContainer = ({ children, onClose }: Omit<Props, "isOpen">) => {
  return (
    <div className="flex w-screen h-screen fixed top-0 left-0 bottom-0 right-0 z-[999] items-center justify-center">
      <Backdrop onClick={onClose} />
      <div className="w-96 h-auto min-h-[10rem] bg-white rounded-xl p-4 flex flex-col gap-2 justify-between items-start z-10">
        {children}
      </div>
    </div>
  );
};

const DialogRoot = ({ isOpen, onClose, children }: Props) => {
  return isOpen ? (
    <Portal>
      <DialogContainer onClose={onClose}>{children}</DialogContainer>
    </Portal>
  ) : null;
};

const Dialog = Object.assign(DialogRoot, {
  Title: DialogTitle,
  Content: DialogContent,
  Actions: DialogActions,
  Button: DialogButton,
});

export default Dialog;
