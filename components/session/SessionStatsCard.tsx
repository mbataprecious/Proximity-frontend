import { capitalCase } from "change-case";
import Image from "next/image";
import React from "react";

interface Props {
  type: string;
  value: number;
}
const SessionStatsCard = ({ type, value }: Props) => {
  return (
    <div className="bg-[#F9FAFB] border w-full md:w-[193px] text-[#4A4A4A] border-[#D1D5DB] px-[18.65px] py-[10.5px] rounded-[6px]">
      <h5 className=" text-xl">{capitalCase(type)}</h5>
      <div className=" flex justify-between items-end">
        <p className=" font-semibold">{value}</p>
        <Image
          src={`/Assets/svg/${type}.svg`}
          alt="status icon"
          height={29}
          width={29}
        />
      </div>
    </div>
  );
};

export default SessionStatsCard;
