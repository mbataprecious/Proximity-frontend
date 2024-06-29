import { cva, VariantProps } from "class-variance-authority";
import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  className?: string;
}
const buttonStyles = cva(
  "py-[10px] rounded-lg bg-primary font-semibold transition-all",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        info: "bg-[#E5E7EB] text-[#1F2A37]",
        // danger: "bg-red-500 text-white focus:ring-red-500",
      },
      fullWidth: {
        true: "w-full",
      },
      isOutlined: {
        true: "!border-2 bg-transparent hover:bg-transparent",
      },
      size: {
        lg: " px-[62.25px] ",
        sm: " px-[23px] ",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
    compoundVariants: [
      {
        variant: "primary",
        isOutlined: true,
        class: "text-primary border-primary",
      },
      {
        variant: "secondary",
        isOutlined: true,
        class: "text-secondary border-secondary",
      },
      {
        variant: "info",
        isOutlined: true,
        class: "text-[#1F304C] border-[##E1E3EA] ",
      },
    ],
  }
);
const Button = ({
  children,
  className,
  size,
  variant,
  isOutlined,
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${buttonStyles({
        variant,
        isOutlined,
        fullWidth,
      })}  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
