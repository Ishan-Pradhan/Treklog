type ButtonProps = {
  children: React.ReactNode;
  Icon: React.ElementType;
  iconPosition?: string;
  onClick?: () => void;
};

function Button({
  children,
  Icon,
  iconPosition = "left",
  onClick,
}: ButtonProps) {
  return (
    <button
      className="bg-primary-500 text-white rounded-md flex items-center gap-2 px-3 text-base py-1 hover:bg-primary-700 transition-all duration-75 ease-in cursor-pointer"
      onClick={onClick}
    >
      {iconPosition === "left" ? <Icon fill="white" /> : ""}
      {children}
      {iconPosition === "right" ? <Icon fill="white" /> : ""}
    </button>
  );
}

export default Button;
