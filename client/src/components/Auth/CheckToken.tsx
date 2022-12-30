import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_PATH } from "@/const";
import { getLocalStorageItem } from "@/util";

interface Props {
  children: React.ReactNode;
}

const CheckToken = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getLocalStorageItem("token")) {
      alert("유효하지 않은 사용자입니다. 로그인을 해주세요.");
      navigate(PAGE_PATH.LOGIN);
    }
  }, []);

  return <>{children}</>;
};

export default CheckToken;
