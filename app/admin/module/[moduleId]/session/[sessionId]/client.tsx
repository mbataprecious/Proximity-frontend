"use client";
import Label from "@/components/Label";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import SortDropdown from "@/components/SortDropdown";
import SessionStatsCard from "@/components/session/SessionStatsCard";
import { classNames } from "@/utils/helpers";
import { people } from "@/utils/mocks";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { capitalCase } from "change-case";
import React, { useRef, useState } from "react";

const colorMap = {
  present: "#11A75C",
  absent: "#FF3838",
  flagged: "#D8A800",
};
const sortOptions = ["present", "absent", "flagged"];
const headers = ["First Name", "Last Name ", "Email", "Attenders  Status"];
const peopleStatus = people.map((person) => {
  return {
    ...person,
    status: sortOptions[Math.floor(Math.random() * sortOptions.length)],
  };
});
export default function () {
  const checkbox = useRef<HTMLInputElement | null>(null);

  const [sort, setSort] = useState("present");
  return (
    <div>
      <div className=" p-[36px] flex justify-between items-center border-b">
        <div>
          <p
            className={
              " py-1 px-2 flex items-center text-xs bg-[#11A75C] rounded-[6px] leading-[20px] font-medium text-white w-fit"
            }
          >
            <span className=" w-2 h-2 rounded-full bg-[#ffffff] mr-2" /> Active
          </p>
          <h2 className=" text-4xl font-bold text-[#4A4A4A] mt-3 max-w-[541px] line-clamp-2 leading-[54px]">
            Introduction to computer science
          </h2>

          <div className=" mt-[.5rem]">
            <p className=" text-[#667185] font-semibold">
              Session Code: &nbsp;
              <span className=" font-bold text-primary"> 4096 </span>
            </p>
            <p className=" text-[#667185] font-semibold mt-4">
              Time: &nbsp;
              <span className=" font-medium"> 10:30 AM - 12:30 PM </span>
            </p>
          </div>
        </div>

        <div className=" bg-[#E2F1FE] border border-[#096DD9] rounded-[10px] p-5 space-y-4 max-w-[431px]">
          <p className=" text-[#202224]">
            <span className=" font-semibold">Module Code : &nbsp;</span>UX101
          </p>
          <p className=" text-[#202224]">
            <span className=" font-semibold">Module Title : &nbsp;</span>
            Introduction to UX Design
          </p>
          <p className=" text-[#202224] flex">
            <span className=" font-semibold">Description : &nbsp;</span>
            <span className=" line-clamp-2">
              A beginner course on UX Design
            </span>
          </p>
        </div>
      </div>
      <div className="p-[36px] flex justify-between ">
        <div className=" flex flex-col md:flex-row items-center space-y-3 md:space-y-0  md:space-x-6">
          {sortOptions.map((status, index) => (
            <SessionStatsCard
              key={status}
              type={status}
              value={(index % 4) * 5}
            />
          ))}
        </div>
        <div className=" flex items-end space-x-2">
          <SortDropdown
            options={sortOptions}
            value={sort}
            onChange={(val) => setSort(val)}
          />

          <SearchInput />
        </div>
      </div>
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
          {peopleStatus.map((person, index) => (
            <tr key={index} className={"hover:bg-blue-50"}>
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
                    person.status === "present"
                      ? "success"
                      : person.status === "absent"
                      ? "danger"
                      : "warning"
                  }
                >
                  {capitalCase(person.status)}{" "}
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
                          .map((status) => (
                            <MenuItem key={status}>
                              {({ focus }) => (
                                <div
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
          ))}
        </tbody>
      </table>
      <div
        className={`flex justify-center mt-14 pb-10 ${
          people.length < 5 && "mt-28"
        }`}
      >
        <Pagination
          pageCount={20}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}
