import { Link } from "react-router-dom";
import AuthForm from "@/pages/auth/components/AuthForm";
import LinkBox from "@/pages/auth/components/LinkBox";

const Signup = () => {
  return (
    <div>
      <AuthForm type="signup" />
      <LinkBox>
        <span>이미 가입하셨나요?</span>
        <Link to={`/auth/login`}>로그인</Link>
      </LinkBox>
    </div>
  );
};
export default Signup;
