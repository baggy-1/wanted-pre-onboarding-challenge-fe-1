import { API_URL, PAGE_PATH } from "@/constants";
import { Link, useNavigate } from "react-router-dom";
import Form from "@/components/common/Form";
import useInput from "@/utils/hooks/useInput";
import useMutation from "@/utils/hooks/useMutation";
import { AuthResponse } from "@/types/todos";
import { setAuthToken } from "@/utils";
import { AxiosError } from "axios";
import { useAuth } from "@/providers/auth";

const LoginContainer = () => {
  const navigate = useNavigate();
  const { props: emailProps } = useInput();
  const { props: passwordProps } = useInput();
  const { mutate } = useMutation();
  const { login } = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate<AuthResponse>({
      url: API_URL.LOGIN,
      method: "post",
      body: {
        email: emailProps.value,
        password: passwordProps.value,
      },
      onSuccess: ({ token }) => {
        setAuthToken(token);
        login(() => {
          navigate(PAGE_PATH.HOME);
        });
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
            break;
          default:
            console.error(error);
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-full max-w-[20rem] h-auto p-8 border rounded-lg gap-4 shadow-xl">
        <Form onSubmit={onSubmit}>
          <Form.Input type="email" label="이메일" {...emailProps} />
          <Form.Input type="password" label="비밀번호" {...passwordProps} />
          <Form.Button type="submit">로그인</Form.Button>
        </Form>
        <span>처음이신가요?</span>
        <Link to={PAGE_PATH.SIGNUP}>회원가입</Link>
      </div>
    </div>
  );
};

export default LoginContainer;
