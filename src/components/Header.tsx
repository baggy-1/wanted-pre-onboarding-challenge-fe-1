import getToken from "@/pages/auth/util/getToken";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const onClickLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/auth/login");
  };

  useLayoutEffect(() => {
    if (getToken()) {
      setIsLogin(true);
      return;
    }

    setIsLogin(false);
  }, []);

  return (
    <header>
      <h1>멋진 Todo App</h1>
      {isLogin && <button onClick={onClickLogout}>로그아웃</button>}
    </header>
  );
};

export default Header;
