import styles from "./Signup.module.css";
import AuthFormBox from "@/components/Auth/AuthFormBox";

const Signup = () => {
  return (
    <div className={styles.container}>
      <AuthFormBox type={"SIGNUP"} />
    </div>
  );
};
export default Signup;
