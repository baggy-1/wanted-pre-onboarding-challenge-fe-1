import useEnhancedEffect from "@/utils/hooks/useEnhancedEffect";
import { useState } from "react";
import ReactDom from "react-dom";

interface Props {
  children: React.ReactNode;
  container?: Element;
}

const Portal = ({ children, container }: Props) => {
  const [mountNode, setMountNode] = useState<Element | null>(null);

  useEnhancedEffect(() => {
    setMountNode(container || document.body);
  }, [container]);

  return (
    <>{mountNode ? ReactDom.createPortal(children, mountNode) : mountNode}</>
  );
};

export default Portal;
