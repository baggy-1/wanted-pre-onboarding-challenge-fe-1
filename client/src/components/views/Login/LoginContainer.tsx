import { PAGE_PATH } from "@/constants";
import { Link, useNavigate } from "react-router-dom";
import Form from "@/components/common/Form";
import useInput from "@/utils/hooks/useInput";
import useMutation from "@/utils/hooks/useMutation";
import { setAuthToken } from "@/utils";
import { useAuth } from "@/providers/auth";
import { AuthParmas } from "@/types/auth";
import { handleAuthError, userLogin } from "@/services/auth";

const LoginContainer = () => {
  const navigate = useNavigate();
  const { props: emailProps } = useInput();
  const { props: passwordProps } = useInput();
  const { mutate } = useMutation({
    mutationFn: (params: AuthParmas) => userLogin(params),
    onSuccess: ({ token }) => {
      setAuthToken(token);
      login(() => {
        navigate(PAGE_PATH.HOME);
      });
    },
    onError: handleAuthError,
  });
  const { login } = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate({
      email: emailProps.value,
      password: passwordProps.value,
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
