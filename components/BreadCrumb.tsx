"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useAuthRequest from "@/hooks/useAuthRequest";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next-nprogress-bar";

type TBreadCrumbProps = {
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NextBreadcrumb = ({
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const router = useRouter();
  const { request } = useAuthRequest();
  const pathNames = paths.split("/").filter((path) => path);
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const linkExceptions = ["admin", "student", "session"];
  useEffect(() => {
    if (pathNames[0] === "admin" && pathNames[1] === "module" && pathNames[2]) {
      const getSingleModule = async (id: string) => {
        try {
          const { data } = await request.get<{ data: { module: IModule } }>(
            "/modules/" + id
          );
          setModuleTitle(data.data.module.title);
        } catch (error) {
          console.log(error);
        }
      };

      getSingleModule(pathNames[2]);
    }
  }, [pathNames]);

  return (
    <div className="w-full overflow-auto hide-scrollbar">
      <ul className={containerClasses}>
        <li
          onClick={() => router.back()}
          className={listClasses + " inline-flex items-center cursor-pointer "}
        >
          <span className=" w-6 h-6 bg-white border-2 rounded border-[#E4E7EC]">
            <ArrowLongLeftIcon className=" mx-auto w-[20px]" />
          </span>
          <span className=" text-[#667185] ml-1 no-underline">Back</span>
        </li>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          console.log({ href, link, index });
          if (linkExceptions.includes(link)) {
            return null;
          }
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1)
            : link;
          if (link === pathNames[2] && moduleTitle) {
            itemLink = moduleTitle;
          }
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                {paths === href ? (
                  itemLink
                ) : (
                  <Link href={href}>{itemLink}</Link>
                )}
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;
