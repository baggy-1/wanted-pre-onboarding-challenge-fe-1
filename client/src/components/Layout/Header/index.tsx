import { PAGE_PATH } from "@/const";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, removeAuthToken } from "@/util/auth";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const onClickLogout = () => {
    removeAuthToken();
    setIsLogin(false);
    navigate(PAGE_PATH.LOGIN);
  };

  const onClickMoveHome = () => {
    navigate(PAGE_PATH.HOME);
  };

  useLayoutEffect(() => {
    if (getAuthToken()) {
      setIsLogin(true);
      return;
    }

    setIsLogin(false);
  }, []);

  return (
    <header className="flex justify-center items-center w-full h-[5rem] sticky top-0 left-0 bg-white z-50">
      <div className="flex items-center justify-between w-full max-w-[60rem] h-full">
        <h1
          className="text-2xl font-bold rounded cursor-pointer"
          onClick={onClickMoveHome}
        >
          멋진 Todo App
        </h1>
        {isLogin && (
          <button
            className="w-24 h-8 text-center rounded shadow-md cursor-pointer hover:text-white hover:bg-blue-500"
            onClick={onClickLogout}
          >
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
