import Image from "next/image";

const Card: React.FC<CardProps> = ({ className, children, ...rest }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 border border-gray-200 rounded-2xl shadow ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
