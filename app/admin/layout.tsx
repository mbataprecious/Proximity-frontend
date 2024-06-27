import { Container } from "@/components/Container";
import SvgIconStyle from "@/components/SvgIconStyle";
import Image from "next/image";
import React from "react";
/* Proximity */

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className=" bg-primary py-[23px] text-white">
        <Container className="max-w-[85rem] flex justify-between items-center">
          <Image
            src={"/Assets/svg/Proximity.svg"}
            alt="logo"
            width={176.5}
            height={36.62}
          />
          <div className="flex items-center">
            <div className="relative w-[43.12px] h-[43.12px] flex items-center justify-center">
              <span className="absolute bg-[#58BD7D] h-[12.9px] w-[12.9px] rounded-full top-0 right-0" />
              <SvgIconStyle
                src="/Assets/svg/bell.svg"
                className="w-[26px] h-[26px] text-white m-auto"
              />
            </div>
            <div className="flex items-center ml-4">
              <p className=" font-semibold text-[17px] ml-4">Hello, Michael</p>
              <SvgIconStyle
                src="/Assets/svg/keyboard_arrow_down.svg"
                className=" text-white"
              />
            </div>
          </div>
        </Container>
      </div>
      {children}
    </div>
  );
};

export default layout;
