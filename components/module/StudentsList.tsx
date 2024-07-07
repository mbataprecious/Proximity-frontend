"use client";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Button from "../Button";
import SortDropdown from "../SortDropdown";
import SearchInput from "../SearchInput";
import SvgIconStyle from "../SvgIconStyle";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/utils/helpers";
import Pagination from "../Pagination";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { people } from "@/utils/mocks";

const headers = ["First Name", "Last Name ", "Email"];

const sortOptions = ["Newest", "Oldest", "Alphabetical"];
const StudentsList = () => {
  const checkbox = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const [sort, setSort] = useState("newest");
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<typeof people>([]);
  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }
  const Empty = (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="  ">
        <div>
          <Image
            src="/Assets/svg/No-Content.svg"
            alt="empty"
            className=" mx-auto"
            width={157}
            height={157}
          />
        </div>
        <div className="">
          <Link
            href={{
              pathname,
              query: {
                addState: "true",
              },
            }}
          >
            <Button shadow className=" mt-9">
              Add New Student
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className=" pl-[98px] pt-[60px] pb-[42px] flex justify-between pr-9">
        <div className=" flex items-center space-x-2">
          {!selectedPeople.length ? (
            <>
              <SortDropdown
                options={sortOptions}
                value={sort}
                onChange={(val) => setSort(val)}
              />

              <SearchInput />
            </>
          ) : (
            <>
              <Button
                size={"sm"}
                variant={"danger"}
                className=" flex items-center"
              >
                <TrashIcon className=" w-6 mr-2" />
                Delete Selected
              </Button>
              <Button
                size={"sm"}
                isOutlined
                className=" border-none !bg-blue-100"
              >
                Select All 234 modules
              </Button>
            </>
          )}
        </div>
        <div className=" space-x-3 flex items-center">
          <Button
            variant={"info"}
            isOutlined
            size={"sm"}
            className=" flex items-center space-x-1"
          >
            <SvgIconStyle
              src="/Assets/svg/download-icon.svg"
              className=" mr-1"
            />
            Download Template
          </Button>
          <Button
            variant={"info"}
            isOutlined
            size={"sm"}
            className=" flex items-center space-x-1"
          >
            <SvgIconStyle src="/Assets/svg/export-icon.svg" className=" mr-1" />
            Import
          </Button>
        </div>
      </div>
      <table className="min-w-full table-fixed divide-y divide-gray-300">
        <thead className=" bg-[#017FED]">
          <tr>
            <th scope="col" className="relative px-7 sm:w-32 sm:px-12">
              <input
                type="checkbox"
                className="absolute left-4 sm:left-10 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                ref={checkbox}
                checked={checked}
                onChange={toggleAll}
              />
            </th>
            {headers.map((title) => (
              <th
                key={title}
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
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
          {people.map((person, index) => (
            <tr
              key={index}
              className={`${
                selectedPeople.includes(person) ? "bg-blue-50" : undefined
              } hover:bg-blue-50`}
            >
              <td className="relative px-7 sm:w-32 sm:px-12">
                {selectedPeople.includes(person) && (
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                )}
                <input
                  type="checkbox"
                  className="absolute left-4 sm:left-10 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                  value={person.email}
                  checked={selectedPeople.includes(person)}
                  onChange={(e) =>
                    setSelectedPeople(
                      e.target.checked
                        ? [...selectedPeople, person]
                        : selectedPeople.filter((p) => p !== person)
                    )
                  }
                />
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-700">
                {person.firstName}
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-700">
                {person.lastName}
              </td>
              <td
                title={person.email}
                className="whitespace-nowrap px-3 py-5 text-sm text-gray-700 line-clamp-1"
              >
                {person.email}
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
                        <MenuItem>
                          {({ focus }) => (
                            <div
                              className={classNames(
                                "flex items-center cursor-pointer",
                                focus
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              <TrashIcon className=" w-6 h-6 mr-2" /> Remove
                            </div>
                          )}
                        </MenuItem>
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
};

export default StudentsList;
