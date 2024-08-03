"use client";
import ClientTimeText from "@/components/ClientTimeText";
import Label from "@/components/Label";
import ModuleDetailBox from "@/components/ModuleDetailBox";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import SortDropdown from "@/components/SortDropdown";
import SessionStatsCard from "@/components/session/SessionStatsCard";
import useAuthRequest from "@/hooks/useAuthRequest";
import { classNames } from "@/utils/helpers";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { capitalCase } from "change-case";
import { parseISO } from "date-fns";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { XiorError } from "xior";

const colorMap = {
  present: "#11A75C",
  absent: "#FF3838",
  flagged: "#D8A800",
};
const sortOptions = ["present", "absent", "flagged"];
const headers = ["First Name", "Last Name ", "Email", "Attendance Status"];

interface Props {
  moduleData: IModule;
  sessionData: ISession;
  sessionAttendance: IAttendanceList;
}

export default function ({
  moduleData,
  sessionData,
  sessionAttendance,
}: Props) {
  const { request } = useAuthRequest();
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [filterBy, setFilterBy] = useState(
    searchParams.get("filterBy") || "none"
  );
  const router = useRouter();

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setFilterBy(searchParams.get("filterBy") || "none");
  }, [moduleData, sessionData, sessionAttendance]);

  const handleStatusUpdate = async (studentId: string, status: string) => {
    try {
      const response = await request.put(
        "attendance/students/" + studentId,
        {
          status,
        },
        {
          params: {
            session: sessionData._id,
          },
        }
      );
      if (response) {
        router.refresh();
        toast.success("status updated successfully");
      }
    } catch (error) {
      if (error instanceof XiorError) {
        toast.error(error?.response?.data.message as string);
      } else {
        toast.error((error as { message: string })?.message);
      }
      console.error(error);
    }
  };

  return (
    <div>
      <div className=" lg:p-[36px] p-[10px] flex justify-between items-start lg:items-center border-b flex-col gap-2 lg:gap-2 lg:flex-row">
        <div>
          {parseISO(sessionData.endTime).getTime() > Date.now() ? (
            <p
              className={
                " py-1 px-2 flex items-center text-xs bg-[#11A75C] rounded-[6px] leading-[20px] font-medium text-white w-fit"
              }
            >
              <span className=" w-2 h-2 rounded-full bg-[#ffffff] mr-2" />{" "}
              Active
            </p>
          ) : (
            <p
              className={
                " py-1 px-2 flex items-center text-xs bg-[#096DD9] rounded-[6px] leading-[20px] font-medium text-white w-fit"
              }
            >
              <span className=" w-2 h-2 rounded-full bg-[#ffffff] mr-2" />{" "}
              Completed
            </p>
          )}
          <h2 className="text-2xl lg:text-4xl font-bold text-[#4A4A4A] mt-3 max-w-[541px] line-clamp-2 leading-[54px]">
            {moduleData.title}
          </h2>

          <div className=" mt-[.5rem]">
            <p className=" text-[#667185] font-semibold">
              Session Code: &nbsp;
              <span className=" font-bold text-primary">
                {sessionData.code}
              </span>
            </p>
            <p className=" text-[#667185] font-semibold mt-4">
              Time: &nbsp;
              <span className=" font-medium">
                <ClientTimeText
                  ISOstring={sessionData.createdAt}
                  format="hh:mm a"
                />{" "}
                -
                <ClientTimeText
                  ISOstring={sessionData.endTime}
                  format="hh:mm a"
                />
              </span>
            </p>
          </div>
        </div>

        <ModuleDetailBox details={moduleData} />
      </div>
      <div className="p-[10px] md:p-[36px] flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-0">
        <div className=" flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0  md:space-x-6">
          {sortOptions.map((status) => (
            <SessionStatsCard
              key={status}
              type={status}
              value={
                sessionData[
                  status.toLowerCase() as keyof typeof sessionData
                ] as number
              }
            />
          ))}
        </div>
        <div className=" flex items-end space-x-2">
          <SortDropdown
            options={["none", ...sortOptions]}
            value={filterBy}
            prefixText="filter by"
            onChange={(val) => {
              const current = new URLSearchParams(
                Array.from(searchParams.entries())
              );
              current.set("page", "1");
              if (val !== "none") {
                current.set("filterBy", val);
              } else {
                current.delete("filterBy");
              }
              current.delete("keyword");
              router.push(`${pathname}?${current.toString()}`);
              setFilterBy(val);
            }}
          />

          <SearchInput
            value={keyword}
            onSearchClick={() => {
              if (keyword) {
                const current = new URLSearchParams(
                  Array.from(searchParams.entries())
                );
                current.set("page", "1");
                current.set("keyword", keyword);
                if (filterBy !== "none") {
                  current.set("filterBy", filterBy);
                } else {
                  current.delete("filterBy");
                }
                router.push(`${pathname}?${current.toString()}`);
                router.refresh();
              }
            }}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full overflow-auto hide-scrollbar">
      <table className="min-w-full table-fixed divide-y divide-gray-300">
        <thead className=" bg-[#017FED]">
          <tr>
            {headers.map((title, index) => (
              <th
                key={title}
                scope="col"
                className={
                  "px-3 py-3.5 text-left text-sm font-semibold text-white " +
                  (index < 2 ? " text-center" : "")
                }
              >
                {title}
              </th>
            ))}

            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sessionAttendance.attendance.map((person) => {
            return (
              <tr key={person.userId} className={"hover:bg-blue-50"}>
                <td className="whitespace-nowrap px-3 text-center py-5 text-sm text-gray-700">
                  {person.firstName}
                </td>
                <td className="whitespace-nowrap px-3 text-center py-5 text-sm text-gray-700">
                  {person.lastName}
                </td>
                <td
                  title={person.email}
                  className="whitespace-nowrap px-3 py-5 text-sm text-gray-700 line-clamp-1"
                >
                  {person.email}
                </td>
                <td
                  // title={person.status}
                  className="whitespace-nowrap px-3 py-5 text-sm text-gray-700"
                >
                  <Label
                    variant={
                      person.status === "flagged"
                        ? "warning"
                        : person.status === "present"
                        ? "success"
                        : "danger"
                    }
                  >
                    {capitalCase(person?.status as string)}
                  </Label>
                </td>
                <td className="whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="flex items-center rounded-full text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-[143px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions
                            .filter((opt) => opt !== person.status)
                            .filter((opt) => opt !== "flagged")
                            .map((status) => (
                              <MenuItem key={status}>
                                {({ focus }) => (
                                  <div
                                    onClick={() =>
                                      handleStatusUpdate(person.userId, status)
                                    }
                                    className={classNames(
                                      "flex items-center  cursor-pointer",
                                      focus
                                        ? "bg-gray-50 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    <span
                                      className={`w-2 h-2 rounded-full mr-2 `}
                                      style={{
                                        background:
                                          colorMap[
                                            status as keyof typeof colorMap
                                          ],
                                      }}
                                    ></span>
                                    {capitalCase(status)}
                                  </div>
                                )}
                              </MenuItem>
                            ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div
        className={`flex justify-center mt-14 pb-10 ${
          sessionAttendance.attendance.length < 5 && "mt-28"
        }`}
      >
        <Pagination
          pageCount={sessionAttendance?.metaData?.totalPages}
          pageRangeDisplayed={3}
          currentPage={sessionAttendance?.metaData?.currentPage}
          marginPagesDisplayed={2}
          onPageChange={(page) => {
            const current = new URLSearchParams(
              Array.from(searchParams.entries())
            );
            current.set("page", page.toString());
            router.push(`${pathname}?${current.toString()}`);
            router.refresh();
          }}
        />
      </div>
    </div>
  );
}
