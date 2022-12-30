import styles from "./CenterBox.module.css";

interface Props {
  children: React.ReactNode;
}

const CenterBox = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default CenterBox;
