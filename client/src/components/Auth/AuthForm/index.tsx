import styles from "./AuthForm.module.css";
import { FormEvent, useEffect } from "react";
import useInputWithValid from "@/hooks/useInputWithValid";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AUTH_TYPE, PAGE_PATH } from "@/const";
import { getLocalStorageItem } from "@/util";
import { AuthResponse, AuthType } from "@/types";

interface Props {
  type: AuthType;
}

const AuthForm = ({ type }: Props) => {
  const navigate = useNavigate();
  const {
    value: email,
    onChange: onChangeEmail,
    isValid: isValidEmail,
  } = useInputWithValid("", "EMAIL");
  const {
    value: password,
    onChange: onChangePassword,
    isValid: isValidPassword,
  } = useInputWithValid("", "PASSWORD");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const body = {
        email,
        password,
      };
      const {
        data: { token },
      }: {
        [key: string]: unknown;
        data: AuthResponse;
      } = await axios.post(AUTH_TYPE[type].api, body);
      localStorage.setItem("token", token);
      navigate(PAGE_PATH.HOME);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          alert(error.response.data.details);
          return;
        }
        if (error.response?.status === 400) {
          alert(error.response.data.details);
          return;
        }
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (getLocalStorageItem("token")) {
      navigate(PAGE_PATH.HOME);
    }
  }, []);

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="최소 '@', '.'를 포함해야 합니다"
          />
        </div>
        <div className={styles.inputBox}>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호는 8자 이상입니다"
          />
        </div>
        <button
          className={styles.button}
          type="submit"
          disabled={!(isValidEmail && isValidPassword)}
        >
          {AUTH_TYPE[type].text}
        </button>
      </form>
    </>
  );
};

export default AuthForm;
