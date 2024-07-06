import LecturerLayout from "@/components/Layouts/LecturerLayout";
import Image from "next/image";
import React from "react";
import Button from "@/components/Button";
import SvgIconStyle from "@/components/SvgIconStyle";
import Link from "next/link";
import Client from "./client";
const Module = () => {
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
        <Button className=" mt-[54px]">Create a new Module</Button>
      </div>
    </div>
  );
  return (
    <LecturerLayout
      sideContent={
        <Link href={"module/create"}>
          <Button size={"sm"} className=" my-2.5 flex items-center">
            <SvgIconStyle src="/Assets/svg/plus-Icons.svg" className=" mr-1" />
            Create New Module
          </Button>
        </Link>
      }
    >
      <Client />
    </LecturerLayout>
  );
};

export default Module;
