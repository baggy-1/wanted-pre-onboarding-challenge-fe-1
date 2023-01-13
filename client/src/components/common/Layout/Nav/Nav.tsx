import { PAGE_PATH } from "@/constants";
import { removeAuthToken } from "@/utils";
import { useAuth } from "@/providers/auth";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onClickLogout = () => {
    removeAuthToken();
    navigate(PAGE_PATH.LOGIN);
  };

  const onClickMoveHome = () => {
    navigate(PAGE_PATH.HOME);
  };

  return (
    <header className="flex justify-center items-center w-full h-[5rem] sticky top-0 left-0 bg-white z-50">
      <div className="flex items-center justify-between w-full max-w-[60rem] h-full">
        <h1
          className="text-2xl font-bold rounded cursor-pointer"
          onClick={onClickMoveHome}
        >
          멋진 Todo App
        </h1>
        <button
          className="w-24 h-8 text-center rounded shadow-md cursor-pointer hover:text-white hover:bg-blue-500"
          onClick={() => logout(onClickLogout)}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Nav;
