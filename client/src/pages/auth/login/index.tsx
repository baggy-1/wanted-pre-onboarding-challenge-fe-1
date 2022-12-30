import styles from "./Login.module.css";
import AuthFormBox from "@/components/Auth/AuthFormBox";

const Login = () => {
  return (
    <div className={styles.container}>
      <AuthFormBox type={"LOGIN"} />
    </div>
  );
};

export default Login;
