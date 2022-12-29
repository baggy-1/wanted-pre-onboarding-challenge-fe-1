interface Props {
  children: React.ReactNode;
}

const LinkBox = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default LinkBox;
