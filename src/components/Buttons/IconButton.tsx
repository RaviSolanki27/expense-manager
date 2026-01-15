const IconButton = ({
  label,
  frontIcon,
  backIcon,
  onClick,
  className,
}: {
  label?: string;
  frontIcon?: React.ReactNode;
  backIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 text-xs cursor-pointer hover:bg-purple-20 hover:text-purple-80 " +
        className
      }
    >
      {frontIcon && <span>{frontIcon}</span>}
      {label && <span>{label}</span>}
      {backIcon && <span>{backIcon}</span>}
    </button>
  );
};

export default IconButton;
