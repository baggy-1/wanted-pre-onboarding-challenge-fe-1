import { FormEvent, useEffect } from "react";
import useInputWithValid from "@/hooks/useInputWithValid";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import getToken from "@/pages/auth/util/getToken";

interface Props {
  type: "login" | "signup";
}

interface SuccessResponse {
  message: string;
  token: string;
}

const AUTH_TYPE = {
  login: {
    text: "로그인",
    api: "/users/login",
  },
  signup: {
    text: "회원가입",
    api: "/users/create",
  },
};

const AuthForm = ({ type }: Props) => {
  const navigate = useNavigate();
  const {
    value: email,
    onChange: onChangeEmail,
    isValid: isValidEmail,
  } = useInputWithValid("", "email");
  const {
    value: password,
    onChange: onChangePassword,
    isValid: isValidPassword,
  } = useInputWithValid("", "password");

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
        data: SuccessResponse;
      } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${AUTH_TYPE[type].api}`,
        body
      );
      localStorage.setItem("token", token);
      navigate("/");
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
    if (getToken()) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="최소 '@', '.'를 포함해야 합니다"
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호는 8자 이상입니다"
        />
        <button type="submit" disabled={!(isValidEmail && isValidPassword)}>
          {AUTH_TYPE[type].text}
        </button>
      </form>
    </>
  );
};

export default AuthForm;
