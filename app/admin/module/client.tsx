"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import DeleteModuleModal from "@/components/DeleteModuleModal";
import { useRouter } from "next-nprogress-bar";

const headers = ["Module Title", "Module Code", "Description"];
const sortMap = {
  Newest: "DSC",
  Oldest: "ASC",
};
export default function ({ moduleList }: { moduleList: IModuleList }) {
  const searchParams = useSearchParams();
  const checkbox = useRef<HTMLInputElement | null>(null);
  const [sort, setSort] = useState(
    Object.keys(sortMap).find(
      (val) => sortMap[val as keyof typeof sortMap] === searchParams.get("sort")
    ) || "Newest"
  );
  const [checked, setChecked] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isClearable, setIsClearable] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [select, setSelect] = useState<IModule>();
  const [selectOne, setSelectOne] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [modules, setModules] = useState<IModuleList["modules"]>(
    moduleList?.modules ?? []
  );
  const [selectedPeople, setSelectedPeople] = useState<typeof modules>([]);
  const router = useRouter();

  useEffect(() => {
    setModules(moduleList?.modules ?? []);
    setKeyword(searchParams.get("keyword") || "");
  }, [moduleList, searchParams]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < modules.length;
    setChecked(selectedPeople.length === modules.length);
    if (!(selectedPeople.length === modules.length)) {
      setDeleteAll(false);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedPeople, modules.length]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : modules);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const onDeleteClose = () => {
    setSelectOne(false);
    setDeleteSelected(false);
  };
  return (
    <div className="w-full">
      <div className=" p-3 lg:p-9 flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <h2 className="lg:text-4xl font-bold text-2xl">Modules</h2>
        <div className=" flex lg:space-x-4 items-start  lg:flex-row lg:items-center max-[700px]:gap-5 max-[700px]:mt-4">
          {!selectedPeople.length ? (
            <>
              <SortDropdown
                options={Object.keys(sortMap)}
                value={sort}
                onChange={(val) => {
                  setSort(val);
                  router.push(
                    `/admin/module?page=1&sort=${
                      sortMap[val as keyof typeof sortMap]
                    }`
                  );
                  router.refresh();
                }}
              />

              <SearchInput
                value={keyword}
                isClearable={isClearable}
                onSearchClick={() => {
                  if (keyword) {
                    setIsClearable(true);
                    router.push(
                      `/admin/module?page=1&${
                        sort
                          ? `sort=${sortMap[sort as keyof typeof sortMap]}&`
                          : ``
                      }${!!keyword && `keyword=${keyword}`}`
                    );
                    router.refresh();
                  }
                }}
                onClear={() => {
                  router.push(
                    `/admin/module?page=1&${
                      sort
                        ? `sort=${sortMap[sort as keyof typeof sortMap]}`
                        : ``
                    }`
                  );
                  router.refresh();
                  setKeyword("");
                  setIsClearable(false);
                }}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </>
          ) : (
            <>
              {moduleList?.metadata?.totalDocuments > 1 &&
                selectedPeople.length === modules.length &&
                !deleteAll && (
                  <Button
                    size={"sm"}
                    isOutlined
                    onClick={() => setDeleteAll(true)}
                    className=" border-none bg-blue-100!"
                  >
                    Select All {moduleList?.metadata?.totalDocuments} modules
                  </Button>
                )}
              <Button
                size={"sm"}
                variant={"danger"}
                onClick={() => {
                  setDeleteSelected(true);
                  setSelectOne(false);
                  setSelect(undefined);
                }}
                className=" flex items-center"
              >
                <TrashIcon className=" w-6 mr-2" />
                {deleteAll ? "Delete All Modules" : "Delete Selected"}
              </Button>
            </>
          )}
        </div>
      </div>
      {/* module list table */}
      <div className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar pb-[120px]">
        <table className="min-w-full table-fixed divide-y divide-gray-300 ">
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
                      <MenuButton className="flex items-center rounded-full text-gray-700 hover:text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
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
                      <MenuItems className="absolute right-0 z-200 mt-2 w-[143px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
                        <div className="py-1">
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                prefetch={false}
                                href={`module/${module._id}`}
                                className={classNames(
                                  "flex items-center cursor-pointer",
                                  focus
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <ArrowTopRightOnSquareIcon className=" w-6 h-6 mr-2" />
                                View
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href={`module/${module._id}/edit`}
                                className={classNames(
                                  "flex items-center cursor-pointer",
                                  focus
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <PencilSquareIcon className=" w-6 h-6 mr-2" />
                                Edit
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
                                onClick={() => {
                                  setSelect(module);
                                  setSelectOne(true);
                                  setDeleteSelected(false);
                                }}
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
      </div>
      <div
        className={`flex justify-center mt-0 pb-10 ${
          modules.length < 5 && "mt-28"
        }`}
      >
        <Pagination
          pageCount={moduleList?.metadata?.totalPages}
          pageRangeDisplayed={3}
          currentPage={moduleList?.metadata?.currentPage}
          marginPagesDisplayed={2}
          onPageChange={(page) => {
            router.push(
              `/admin/module?page=${page}${
                searchParams.get("sort")
                  ? `&sort=${sortMap[sort as keyof typeof sortMap]}`
                  : ""
              }`
            );
            router.refresh();
            setChecked(false);
          }}
        />
      </div>
      <DeleteModuleModal
        deleteAll={deleteAll}
        selectedModules={selectedPeople}
        isSingle={selectOne}
        singleModule={select}
        onClose={onDeleteClose}
        open={selectOne || deleteSelected}
      />
    </div>
  );
}
