import LecturerLayout from "@/components/Layouts/LecturerLayout";
import Image from "next/image";
import React from "react";
import Button from "@/components/Button";
import SvgIconStyle from "@/components/SvgIconStyle";
import Link from "next/link";
import Client from "./client";
import { getModuleList } from "@/data/fetchers";
const Module = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const moduleListDetails = await getModuleList({
    limit: 10,
    page: searchParams?.page ? parseInt(searchParams?.page as string) : 1,
    sort: searchParams?.sort as string,
    keyword: searchParams?.keyword as string
  });
  console.log({ moduleListDetails, searchParams });
  const Empty = (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="  ">
        <div>
          <Image
            src="/Assets/svg/EmptyState.svg"
            alt="empty"
            className=" mx-auto"
            width={250}
            height={200}
          />
        </div>
        <div className=" text-[#4A4A4A]">
          <h3 className=" text-xl font-semibold text-center">No Modules</h3>
          <p className=" text-center">Start creating your Modules</p>
        </div>
        <Link href={"module/create"}>
          <Button className=" mt-[54px]">Create a new Module</Button>
        </Link>
      </div>
    </div>
  );
  return (
    <LecturerLayout
      sideContent={
        <Link href={"module/create"}>
          <Button size={"sm"} className=" my-2.5 lg:flex items-center hidden lg:visible">
            <SvgIconStyle src="/Assets/svg/plus-Icons.svg" className=" mr-1" />
            Create New Module
      
          </Button>
          <Button size={"sm"} className=" my-2.5 flex items-center visible lg:hidden">
            <SvgIconStyle src="/Assets/svg/plus-Icons.svg" className=" mr-1" />
            {/* Create New Module */}
            Add
          </Button>
        </Link>
      }
    >
      {moduleListDetails.metadata.totalDocuments === 0 ? (
        Empty
      ) : (
        <Client moduleList={moduleListDetails} />
      )}
    </LecturerLayout>
  );
};

export default Module;
