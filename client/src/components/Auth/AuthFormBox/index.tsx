import styles from "./AuthFormBox.module.css";
import { Link } from "react-router-dom";
import { AUTH_FORM_BOX_LINK_FOR_TYPE } from "@/const";
import AuthForm from "@/components/Auth/AuthForm";
import CenterBox from "@/components/common/CenterBox";

interface Props {
  type: "LOGIN" | "SIGNUP";
}

const AuthFormBox = ({ type }: Props) => {
  const { text, value, link } = AUTH_FORM_BOX_LINK_FOR_TYPE[type];

  return (
    <div className={styles.box}>
      <AuthForm type={type} />
      <CenterBox>
        <span>{text}</span>
        <Link to={link}>{value}</Link>
      </CenterBox>
    </div>
  );
};

export default AuthFormBox;
