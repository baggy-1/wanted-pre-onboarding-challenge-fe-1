import styles from "./Header.module.css";
import { PAGE_PATH } from "@/const";
import { getLocalStorageItem, removeLocalStorageItem } from "@/util";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const onClickLogout = () => {
    removeLocalStorageItem("token");
    setIsLogin(false);
    navigate(PAGE_PATH.LOGIN);
  };

  const onClickMoveHome = () => {
    navigate(PAGE_PATH.HOME);
  };

  useLayoutEffect(() => {
    if (getLocalStorageItem("token")) {
      setIsLogin(true);
      return;
    }

    setIsLogin(false);
  }, []);

  return (
    <header className={styles.container}>
      <div className={styles.containerBox}>
        <h1 className={styles.brandTitle} onClick={onClickMoveHome}>
          멋진 Todo App
        </h1>
        {isLogin && (
          <button className={styles.button} onClick={onClickLogout}>
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
