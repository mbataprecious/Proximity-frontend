"use client";
import React, { ReactNode } from "react";
import SvgIconStyle from "../SvgIconStyle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "../Container";
import NextBreadcrumb from "../BreadCrumb";

const navItems = [
  {
    title: "Modules",
    icon: "/Assets/svg/module-icon.svg",
    href: "/admin/module",
  },
  {
    title: "Profile",
    icon: "/Assets/svg/person-Icons.svg",
    href: "/admin/profile",
  },
];

interface Props {
  children: ReactNode;
  sideContent?: ReactNode;
}

const LecturerLayout = ({ children, sideContent }: Props) => {
  const pathname = usePathname();
  return (
    <div className="">
      <div className=" bg-white mb-[0.875rem]">
        <Container className="max-w-[85rem] flex justify-between">
          <div className=" flex pt-4">
            {navItems.map(({ title, href, icon }) => {
              const active = pathname.includes(href);
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
      <Container className="max-w-[85rem] flex justify-between">
        <NextBreadcrumb
          separator={<span className=" text-[#98A2B3]"> / </span>}
          activeClasses=" text-[#096DD9] font-medium"
          containerClasses="flex items-center lg:py-6 py-2"
          listClasses="hover:underline mx-2 text-sm text-[#98A2B3]"
          capitalizeLinks
        />
      </Container>

      <div>
        <Container className="max-w-[85rem]">
          <div className=" bg-white min-h-[70vh]">{children}</div>
        </Container>
      </div>
    </div>
  );
};

export default LecturerLayout;
