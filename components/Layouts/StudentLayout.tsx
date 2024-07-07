"use client";
import React, { ReactNode } from "react";
import SvgIconStyle from "../SvgIconStyle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "../Container";
import { studentNavItems } from "@/utils/navItems";

interface Props {
  children: ReactNode;
  sideContent?: ReactNode;
}

const StudentLayout = ({ children, sideContent }: Props) => {
  const pathname = usePathname();
  return (
    <div className="">
      <div className="hidden md:block bg-white mb-[3.875rem]">
        <Container className="max-w-[85rem] flex justify-between">
          <div className=" flex pt-4">
            {studentNavItems.map(({ title, href, icon }, index) => {
              const active = index
                ? pathname.includes(href)
                : pathname.endsWith(href);
              return (
                <Link
                  href={href}
                  key={title}
                  className={` px-4 pb-[23px] border-b-4 ${
                    active
                      ? "border-b-[#0D5CC7] text-[#0D5CC7]"
                      : " border-b-transparent text-[#777E90]"
                  } `}
                >
                  <div className="flex items-center">
                    <SvgIconStyle src={icon} />
                    <span className=" ml-0.5">{title}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div>{sideContent}</div>
        </Container>
      </div>
      <div>
        <Container className=" !px-0 sm:px-0 md:!px-4 md:max-w-[85rem]">
          <div className=" bg-white min-h-screen  md:min-h-[70vh]">
            {children}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentLayout;
