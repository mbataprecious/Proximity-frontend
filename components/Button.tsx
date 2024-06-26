import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`${"px-[62.25px] py-[14px]  rounded-lg bg-primary text-white font-bold"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
