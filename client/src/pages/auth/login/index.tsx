import styles from "./Login.module.css";
import { API_PATH, PAGE_PATH, REGEXP } from "@/const";
import { Link, useNavigate } from "react-router-dom";
import Form from "@/components/common/Form";
import { useEffect } from "react";
import useInput from "@/hooks/useInput";
import useMutation from "@/hooks/useMutation";
import { AuthResponse } from "@/types";
import { getAuthToken, setAuthToken } from "@/util/auth";
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();
  const {
    others: { isValid: isValidEmail },
    props: emailProps,
  } = useInput({
    isValid: (value) => REGEXP.EMAIL.test(value),
  });
  const {
    others: { isValid: isValidPassword },
    props: passwordProps,
  } = useInput({
    isValid: (value) => REGEXP.PASSWORD.test(value),
  });
  const {
    others: { isValid: isValidPasswordCheck },
    props: passwordCheckProps,
  } = useInput({
    isValid: (value) => passwordProps.value === value,
  });
  const { mutate } = useMutation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate<AuthResponse>({
      url: API_PATH.LOGIN,
      method: "post",
      body: {
        email: emailProps.value,
        password: passwordProps.value,
      },
      onSuccess: ({ token }) => {
        setAuthToken(token);
        navigate(PAGE_PATH.HOME);
      },
      onError: (error) => {
        if (!(error instanceof AxiosError)) {
          console.error(error);
          return;
        }
        switch (error.response?.status) {
          case 409:
          case 400:
            alert(error.response.data.details);
          default:
            console.error(error);
        }
      },
    });
  };

  useEffect(() => {
    if (getAuthToken()) {
      navigate(PAGE_PATH.HOME);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Form className={styles.form} onSubmit={onSubmit}>
          <Form.InputWrapper className={styles.inputBox}>
            <Form.Label>이메일</Form.Label>
            <Form.Input
              type="email"
              label="최소 '@', '.'를 포함해야 합니다"
              {...emailProps}
            />
          </Form.InputWrapper>
          <Form.InputWrapper className={styles.inputBox}>
            <Form.Label>비밀번호</Form.Label>
            <Form.Input
              type="password"
              label="비밀번호는 8자 이상입니다"
              {...passwordProps}
            />
          </Form.InputWrapper>
          <Form.InputWrapper className={styles.inputBox}>
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Input
              type="password"
              label="비밀번호 확인"
              {...passwordCheckProps}
            />
          </Form.InputWrapper>
          <Form.Button
            className={styles.button}
            type="submit"
            disabled={
              !isValidEmail || !isValidPassword || !isValidPasswordCheck
            }
          >
            로그인
          </Form.Button>
        </Form>
        <span>처음이신가요?</span>
        <Link to={PAGE_PATH.SIGNUP}>회원가입</Link>
      </div>
    </div>
  );
};

export default Login;
