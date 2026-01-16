"use client";
const Card = ({
  children,
  applyHover = true,
  className,
  title,
}: {
  children: React.ReactNode;
  applyHover?: boolean;
  className?: string;
  title?: string;
}) => {
  return (
    <div
      className={`bg-white py-3 px-5 min-h-[150px] min-w-[200px] rounded-3xl border border-gray-300 relative ${
        applyHover
          ? " transition-all duration-200 hover:shadow-xl hover:shadow-card-background"
          : ""
      } ${className}`}
    >
      {title && <h3 className="text-md font-semibold text-gray-700 mb-5">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
