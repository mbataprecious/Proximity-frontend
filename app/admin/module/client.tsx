"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utils/helpers";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
const headers = ["Module Title", "Module Code", "Description"];
const modules = [
  {
    title: "Introduction to Computer Science",
    code: "CSC101",
    description: "A beginner course on Computer Science",
  },
  {
    title: "Introduction to UX Design",
    code: "UX101",
    description: "A beginner course on UX Design",
  },
  {
    title: "Data Structures and Algorithms",
    code: "CSC102",
    description: "An intermediate course on Data Structures and Algorithms",
  },
  {
    title: "Human-Computer Interaction",
    code: "HCI101",
    description: "A course on the principles of Human-Computer Interaction",
  },
  {
    title: "Introduction to Databases",
    code: "DB101",
    description: "A beginner course on Database Management Systems",
  },
  {
    title: "Advanced Web Development",
    code: "WEB201",
    description: "An advanced course on web development techniques",
  },
  {
    title: "Mobile Application Development",
    code: "MOB101",
    description:
      "A course on developing mobile applications for various platforms",
  },
  {
    title: "Introduction to Artificial Intelligence",
    code: "AI101",
    description:
      "A beginner course on Artificial Intelligence concepts and applications",
  },
  {
    title: "Cybersecurity Fundamentals",
    code: "CYB101",
    description:
      "A course on the basics of cybersecurity and how to protect systems",
  },
  {
    title: "Software Engineering Principles",
    code: "SE101",
    description:
      "A course on the principles and practices of software engineering",
  },
];

const sortOptions = ["Newest", "Oldest", "Alphabetical"];
export default function () {
  const checkbox = useRef<HTMLInputElement | null>(null);
  const [sort, setSort] = useState("newest");
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<typeof modules>([]);
  const router = useRouter();

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < modules.length;
    setChecked(selectedPeople.length === modules.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : modules);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div>
      <div className=" p-[36px] flex justify-between items-center">
        <h2 className=" text-4xl font-bold">Modules</h2>
        <div className=" flex space-x-4 items-start">
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
                isOutlined
                className=" border-none !bg-blue-100"
              >
                Select All 234 modules
              </Button>
              <Button
                size={"sm"}
                variant={"danger"}
                className=" flex items-center"
              >
                <TrashIcon className=" w-6 mr-2" />
                Delete Selected
              </Button>
            </>
          )}
        </div>
      </div>
      {/* module list table */}
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
          {modules.map((module, index) => (
            <tr
              key={index}
              className={`${
                selectedPeople.includes(module) ? "bg-blue-50" : undefined
              } hover:bg-blue-50`}
            >
              <td className="relative px-7 sm:w-32 sm:px-12">
                {selectedPeople.includes(module) && (
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                )}
                <input
                  type="checkbox"
                  className="absolute left-4 sm:left-10 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                  value={module.title}
                  checked={selectedPeople.includes(module)}
                  onChange={(e) =>
                    setSelectedPeople(
                      e.target.checked
                        ? [...selectedPeople, module]
                        : selectedPeople.filter((p) => p !== module)
                    )
                  }
                />
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-700">
                {module.title}
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-700">
                {module.code}
              </td>
              <td
                title={module.description}
                className="whitespace-nowrap px-3 py-5 text-sm text-gray-700 line-clamp-1"
              >
                {module.description}
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
                            <Link
                              href={`module/000${index}`}
                              className={classNames(
                                "flex items-center cursor-pointer",
                                focus
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              <ArrowTopRightOnSquareIcon className=" w-6 h-6 mr-2" />{" "}
                              View
                            </Link>
                          )}
                        </MenuItem>
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
                              <PencilSquareIcon className=" w-6 h-6 mr-2" />{" "}
                              Edit
                            </div>
                          )}
                        </MenuItem>
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
                              <TrashIcon className=" w-6 h-6 mr-2" /> Delete
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
          modules.length < 5 && "mt-28"
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
