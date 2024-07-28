import React from "react";
import ClientTimeText from "@/components/ClientTimeText";

const headers = ["Module Title", "Module code", "Time"];

export default function ({ attendList }: { attendList: IAttendanceList }) {
  return (
    <div className=" flex flex-col items-center md:justify-center min-h-screen md:min-h-[70vh] m-auto">
      <div className=" flex md:hidden text-[#4A4A4A] w-full justify-center p-5 mb-16">
        {/* <ArrowLeftIcon
      className=" w-6 h-6 cursor-pointer"
      onClick={() => router.back()}
    /> */}
        <h3 className=" font-bold text-xl ">Recent Attendance</h3>
        <p />
      </div>
      <div className=" pb-20">
        <table className="w-full overflow-x-auto table-fixed divide-y divide-gray-300">
          <thead className=" bg-[#017FED]">
            <tr>
              {headers.map((title) => (
                <th
                  key={title}
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {attendList.attendance.map((session, index) => (
              <tr key={index} className={`hover:bg-blue-50 cursor-pointer`}>
                <td className="whitespace-nowrap px-3 py-5 md:text-center text-sm text-gray-700 text-wrap">
                  <span className=" line-clamp-2"> {session.module}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                  {session.code}
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                  <ClientTimeText ISOstring={session.date} format="hh:mm a" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
