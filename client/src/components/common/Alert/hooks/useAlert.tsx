import Alert from "@/components/common/Alert";
import { useState } from "react";

const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOpen = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderAlert = () => {
    return (
      <Alert
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        content={content}
      />
    );
  };

  return {
    handleOpen,
    handleClose,
    renderAlert,
  };
};

export default useAlert;
``;
