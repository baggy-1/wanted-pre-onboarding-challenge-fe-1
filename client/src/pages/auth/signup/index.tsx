import { Link } from "react-router-dom";
import { PAGE_PATH } from "@/const";
import AuthForm from "@/components/Auth/AuthForm";
import LinkBox from "@/components/common/LinkBox";

const Signup = () => {
  return (
    <div>
      <AuthForm type="signup" />
      <LinkBox>
        <span>이미 가입하셨나요?</span>
        <Link to={PAGE_PATH.LOGIN}>로그인</Link>
      </LinkBox>
    </div>
  );
};
export default Signup;
