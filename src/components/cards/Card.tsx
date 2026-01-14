"use client"
const Card = ({ children, applyHover = true }: { children: React.ReactNode, applyHover?: boolean }) => {
  return (
    <div className={`bg-white py-3 px-5 rounded-3xl border border-gray-300 relative ${applyHover ? " transition-all duration-200 hover:shadow-xl hover:shadow-card-background" : ""}`}>
      {children}
    </div>
  );
};

export default Card;
