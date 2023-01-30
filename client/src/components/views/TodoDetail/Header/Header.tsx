interface Props {
  title: React.ReactNode;
  onClose: () => void;
}

const Header = ({ title, onClose }: Props) => {
  return (
    <>
      <div className="w-full h-auto p-4 text-2xl font-bold text-center border-b-2">
        {title}
      </div>
      <button
        className="absolute top-0 right-0 p-2 text-2xl font-bold text-red-500"
        onClick={onClose}
      >
        ❌
      </button>
    </>
  );
};

export default Header;
