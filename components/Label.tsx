import React from "react";
import { cva, VariantProps } from "class-variance-authority";
interface Props
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof labelStyles> {}

const labelStyles = cva("text-xs border rounded-[2px] p-1", {
  variants: {
    variant: {
      primary: "text-[#4388C8] border-[#4388C8] bg-[#F2F2F2]",
      success: "text-[#27AE60] border-[#27AE60] bg-[#FFF8EF]",
      secondary: "text-[#6C757D] border-[#6C757D] bg-[#FFF8EF]",
      warning: "text-[#FFC107] border-[#FFC107] bg-[#FFC107]",
      danger: "text-[#FC441C] border-[#FC441C] bg-[#FFF8EF]",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
const Label = ({ children, className, variant }: Props) => {
  return (
    <span className={`${labelStyles({ variant })} ${className ?? ""}`}>
      {children}
    </span>
  );
};

export default Label;
