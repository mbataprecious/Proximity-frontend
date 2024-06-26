import React from "react";
interface Props {
  label: string;
}
export default function Toggle({ label }: Props) {
  return (
    <div className="flex items-center justify-between">
      <span className=" text-sm font-medium text-gray-500">{label}</span>

      <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
