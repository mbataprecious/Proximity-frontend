import React from "react";
import { cva, VariantProps } from "class-variance-authority";
interface Props
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof labelStyles> {}

const labelStyles = cva("text-base rounded-[4px] p-1 w-fit flex items-center", {
  variants: {
    variant: {
      primary: "text-[##017FED] bg-blue-100",
      success: "text-[#11A75C] bg-[#1db4691e]",
      info: "text-[#5E718D] bg-[#F0F3F9]",
      warning: "text-[#D8A800] bg-[#FFF9DF]",
      danger: "text-[#FF3838] bg-[#FFF5F4]",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
const Label = ({ children, className, variant }: Props) => {
  return (
    <span className={`${labelStyles({ variant })} ${className ?? ""}`}>
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        className=" mr-2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4.58203" cy="4.93652" r="4" fill="currentColor" />
      </svg>
      {children}
    </span>
  );
};

export default Label;
