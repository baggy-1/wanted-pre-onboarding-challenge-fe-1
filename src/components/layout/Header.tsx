import { PAGE_PATH } from "@/const";
import { getToken } from "@/util";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const onClickLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate(PAGE_PATH.LOGIN);
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
