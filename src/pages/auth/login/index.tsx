import { Link } from "react-router-dom";
import AuthForm from "@/pages/auth/components/AuthForm";
import LinkBox from "@/pages/auth/components/LinkBox";

const Login = () => {
  return (
    <div>
      <AuthForm type="login" />
      <LinkBox>
        <span>처음이신가요?</span>
        <Link to={`/auth/signup`}>회원가입</Link>
      </LinkBox>
    </div>
  );
};

export default Login;
