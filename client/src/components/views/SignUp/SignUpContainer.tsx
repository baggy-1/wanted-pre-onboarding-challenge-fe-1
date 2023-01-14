import Form from "@/components/common/Form";
import { PAGE_PATH, REGEXP } from "@/constants";
import useInput from "@/utils/hooks/useInput";
import useMutation from "@/utils/hooks/useMutation";
import { setAuthToken } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth";
import { handleAuthError, userLogin } from "@/services/auth";
import { AuthParmas } from "@/types/auth";

const SignUpContainer = () => {
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

  const isShowNotice = {
    email: !isValidEmail && emailProps.value !== "",
    password: !isValidPassword && passwordProps.value !== "",
    passwordCheck: !isValidPasswordCheck && passwordCheckProps.value !== "",
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-full max-w-[20rem] h-auto p-8 border rounded-lg gap-4 shadow-xl">
        <Form onSubmit={onSubmit}>
          <Form.Input type="email" label="이메일" {...emailProps} />
          <Form.Notice>
            {isShowNotice.email ? "이메일 형식에 맞춰주세요." : ""}
          </Form.Notice>
          <Form.Input type="password" label="비밀번호" {...passwordProps} />
          <Form.Notice>
            {isShowNotice.password ? "비밀번호는 8자 이상입니다." : ""}
          </Form.Notice>
          <Form.Input
            type="password"
            label="비밀번호 확인"
            {...passwordCheckProps}
          />
          <Form.Notice>
            {isShowNotice.passwordCheck ? "비밀번호를 확인해주세요." : ""}
          </Form.Notice>
          <Form.Button
            type="submit"
            disabled={
              !isValidEmail || !isValidPassword || !isValidPasswordCheck
            }
          >
            회원가입
          </Form.Button>
        </Form>
        <span>이미 가입하셨나요?</span>
        <Link to={PAGE_PATH.LOGIN}>로그인</Link>
      </div>
    </div>
  );
};
export default SignUpContainer;
