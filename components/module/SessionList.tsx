import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import SvgIconStyle from "../SvgIconStyle";
import { usePathname, useRouter } from "next/navigation";
import Label from "../Label";
import Pagination from "../Pagination";
import CreateSessionModal from "../session/CreateSessionModal";
import SessionSuccessModal from "../session/SessionSuccessModal";
const headers = ["Session ID", "Date", "Start Time", "End Time", "Geo fencing"];

const sessions = [
  {
    id: "1244356",
    date: "06/16/2024",
    startTime: "10:30 AM",
    endTime: "12:30 PM",
    geoFencing: true,
  },
  {
    id: "1244357",
    date: "06/17/2024",
    startTime: "11:00 AM",
    endTime: "01:00 PM",
    geoFencing: false,
  },
  {
    id: "1244358",
    date: "06/18/2024",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    geoFencing: true,
  },
  {
    id: "1244359",
    date: "06/19/2024",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    geoFencing: false,
  },
  {
    id: "1244360",
    date: "06/20/2024",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    geoFencing: true,
  },
  {
    id: "1244361",
    date: "06/21/2024",
    startTime: "03:00 PM",
    endTime: "05:00 PM",
    geoFencing: false,
  },
  {
    id: "1244362",
    date: "06/22/2024",
    startTime: "07:00 AM",
    endTime: "09:00 AM",
    geoFencing: true,
  },
  {
    id: "1244363",
    date: "06/23/2024",
    startTime: "04:00 PM",
    endTime: "06:00 PM",
    geoFencing: false,
  },
  {
    id: "1244364",
    date: "06/24/2024",
    startTime: "01:00 PM",
    endTime: "03:00 PM",
    geoFencing: true,
  },
  {
    id: "1244365",
    date: "06/25/2024",
    startTime: "05:00 PM",
    endTime: "07:00 PM",
    geoFencing: false,
  },
];
const SessionList = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(true);
  const pathname = usePathname();
  const [sort, setSort] = useState("newest");

  const Empty = (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="  ">
        <div>
          <Image
            src="/Assets/images/session-empty-icon.png"
            alt="empty"
            className=" mx-auto"
            width={250}
            height={200}
          />
        </div>
        <p className=" font-bold text-[20px] text-center"> Add New Session</p>
        <div className=" flex justify-center items-center">
          <Button shadow className=" mt-9" onClick={() => setOpen(true)}>
            Start Session
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className=" flex justify-end items-center py-[22px] px-9">
        <Button
          variant={"info"}
          isOutlined
          size={"sm"}
          className=" flex"
          onClick={() => setOpen(true)}
        >
          <SvgIconStyle src="/Assets/svg/plus-Icons.svg" className=" mr-1" />
          <span>Start Session</span>
        </Button>
      </div>
      <table className="min-w-full table-fixed divide-y divide-gray-300">
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
          {sessions.map((session, index) => (
            <tr
              key={index}
              onClick={() => router.push(pathname + "/session/" + session.id)}
              className={`hover:bg-blue-50 cursor-pointer`}
            >
              <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                {session.id}
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                {session.date}
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                {session.startTime}
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                {session.endTime}
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700 flex justify-center">
                {session.geoFencing ? (
                  <Label variant={"success"}>Enabled </Label>
                ) : (
                  <Label variant={"info"}>Disabled </Label>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={`flex justify-center mt-14 pb-10 ${
          sessions.length < 5 && "mt-28"
        }`}
      >
        <Pagination
          pageCount={20}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={() => {}}
        />
      </div>
      <CreateSessionModal open={open} setOpen={setOpen} />
      <SessionSuccessModal open={successOpen} setOpen={setSuccessOpen} />
    </div>
  );
};

export default SessionList;
