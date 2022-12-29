import { Link } from "react-router-dom";
import { PAGE_PATH } from "@/const";
import AuthForm from "@/components/Auth/AuthForm";
import LinkBox from "@/components/common/LinkBox";

const Login = () => {
  return (
    <div>
      <AuthForm type="login" />
      <LinkBox>
        <span>처음이신가요?</span>
        <Link to={PAGE_PATH.SIGNUP}>회원가입</Link>
      </LinkBox>
    </div>
  );
};

export default Login;
