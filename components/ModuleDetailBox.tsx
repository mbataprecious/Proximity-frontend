import { modules } from "@/utils/mocks";
import React from "react";

interface Props {
  details: IModule;
}

const ModuleDetailBox = ({ details }: Props) => {
  return (
    <div className=" bg-[#E2F1FE] border border-[#096DD9] rounded-[10px] p-5 space-y-4 max-w-[431px]">
      <p className=" text-[#202224]">
        <span className=" font-semibold  text-nowrap">Module Code : &nbsp;</span>
        {details.code}
      </p>
      <p className=" text-[#202224]">
        <span className=" font-semibold text-nowrap">Module Title : &nbsp;</span>
        {details.title}
      </p>
      <p className=" text-[#202224] flex">
        <span className=" font-semibold  text-nowrap">Description : &nbsp;</span>
        <span title={details.description} className=" line-clamp-2">
          {details.description}
        </span>
      </p>
    </div>
  );
};

export default ModuleDetailBox;
