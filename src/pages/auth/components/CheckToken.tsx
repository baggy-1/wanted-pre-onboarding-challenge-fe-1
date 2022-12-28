import { useEffect } from "react";
import getToken from "@/pages/auth/util/getToken";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const CheckToken = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      alert("유효하지 않은 사용자입니다. 로그인을 해주세요.");
      navigate("/auth/login");
    }
  }, []);

  return children;
};

export default CheckToken;
