import Dialog from "@/components/common/Dialog";

interface Props {
  isOpen: boolean;
  onClose: (...args: unknown[]) => void;
  title: string;
  content: string;
  buttonText?: string;
}

const Alert = ({
  isOpen,
  onClose,
  title,
  content,
  buttonText = "확인",
}: Props) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>{content}</Dialog.Content>
      <Dialog.Actions>
        <button type="button">{buttonText}</button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default Alert;
