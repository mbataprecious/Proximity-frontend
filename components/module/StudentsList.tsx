"use client";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { classNames } from "@/utils/helpers";
import Pagination from "../Pagination";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import useAuthRequest from "@/hooks/useAuthRequest";
import { getStudentsAndSessionsByMetadata } from "@/data/fetchers/clientFetchers";
import DeletStudentModal from "../DeleteStudentModal";
import AddStudentModal from "./AddStudentModal";

const headers = ["First Name", "Last Name ", "Email"];
const sortMap = {
  Newest: "DSC",
  Oldest: "ASC",
};
const sortOptions = ["Newest", "Oldest", "Alphabetical"];

interface Props {
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  studentsList: IStudentList;
}

const StudentsList = ({ studentsList, setTotal }: Props) => {
  const checkbox = useRef<HTMLInputElement | null>(null);
  const { request } = useAuthRequest();
  const pathname = usePathname();
  const [sort, setSort] = useState("Newest");
  const [search, setSearch] = useState("");
  const [addStudent, setAddStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClearable, setIsClearable] = useState(false);
  const [students, setStudents] = useState(studentsList?.students ?? []);
  const [checked, setChecked] = useState(false);
  const { moduleId } = useParams<{ moduleId: string }>();
  const [metadata, setMetadata] = useState(studentsList?.metadata ?? {});
  const [page, setPage] = useState<number>(1);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<typeof students>([]);
  const [select, setSelect] = useState<IStudent>();
  const [selectOne, setSelectOne] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [deleteAll] = useState(false);
  console.log(studentsList);
  const handleFetch = async ({
    page,
    sort,
    search,
  }: {
    page: number;
    sort?: string;
    search?: string;
  }) => {
    setLoading(true);
    const data = await getStudentsAndSessionsByMetadata({
      request,
      type: "students",
      moduleId,
      page,
      sort,
      keyword: search,
    }).finally(() => {
      setLoading(false);
    });
    console.log(data);
    setStudents((data as IStudentList).students);
    setMetadata((data as IStudentList).metadata);
    setPage((data as IStudentList).metadata.currentPage);
    setTotal((data as IStudentList).metadata.totalDocuments);
  };
  const onDeleteClose = () => {
    setSelectOne(false);
    setDeleteSelected(false);
  };
  useEffect(() => {
    setStudents(studentsList?.students ?? []);
    setMetadata(studentsList?.metadata ?? {});
    setPage(studentsList?.metadata?.currentPage ?? 1);
    setTotal(studentsList?.metadata?.totalDocuments ?? 0);
    setSearch("");
  }, [studentsList]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedStudents.length > 0 && selectedStudents.length < students.length;
    setChecked(selectedStudents.length === students.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedStudents]);

  function toggleAll() {
    setSelectedStudents(checked || indeterminate ? [] : students);
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
          <Button onClick={() => setAddStudent(true)} shadow className=" mt-9">
            Add New Student
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {students.length ? (
        <div className=" relative">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="p-4 bg-blue-500 text-white italic">
                Loading...
              </div>
            </div>
          )}
          <div className=" pl-[98px] pt-[60px] pb-[42px] flex justify-between pr-9  max-[700px]:flex-col max-[700px]:justify-start max-[700px]:pl-0 max-[700px]:pr-0  max-[700px]:p-3 ">
            <div className=" flex items-center space-x-2  max-[700px]:w-full max-[700px]:p-3">
              {!selectedStudents.length ? (
                <>
                  <SortDropdown
                    options={Object.keys(sortMap)}
                    value={sort}
                    onChange={(val) => {
                      setSort(val);
                      handleFetch({
                        page: 1,
                        sort: sortMap[val as keyof typeof sortMap],
                      });
                      setSearch("");
                    }}
                  />

                  <SearchInput
                    value={search}
                    onSearchClick={() => {
                      handleFetch({ page: 1, search });
                      setIsClearable(true);
                    }}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      if (e.target.value === "") setIsClearable(false);
                    }}
                    isClearable={isClearable}
                    onClear={() => {
                      handleFetch({ page: 1 });
                      setSearch("");
                      setIsClearable(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    size={"sm"}
                    variant={"danger"}
                    className=" flex items-center"
                    onClick={() => {
                      setDeleteSelected(true);
                      setSelectOne(false);
                      setSelect(undefined);
                    }}
                  >
                    <TrashIcon className=" w-6 mr-2" />
                    Delete Selected
                  </Button>
                </>
              )}
            </div>
            <div className=" space-x-3 flex items-center max-[700px]:p-3">
              <Link href={`/admin/module/${moduleId}/edit`}>
                <Button
                  variant={"info"}
                  isOutlined
                  size={"sm"}
                  className=" flex items-center space-x-1"
                >
                  <PencilIcon className=" w-4 mr-1" />
                  Edit
                </Button>
              </Link>

              <Button
                size={"sm"}
                onClick={() => setAddStudent(true)}
                className=" mx-3 flex items-center max-[700px]:w-max"
              >
                <SvgIconStyle
                  src="/Assets/svg/plus-Icons.svg"
                  className=" mr-1"
                />
                Add Student
              </Button>
            </div>
          </div>
          <div className="w-full overflow-auto hide-scrollbar">
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
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white max-[700px]:w-max"
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
              {students.map((person, index) => (
                <tr
                  key={index}
                  className={`${
                    selectedStudents.includes(person) ? "bg-blue-50" : undefined
                  } hover:bg-blue-50`}
                >
                  <td className="relative px-7 sm:w-32 sm:px-12">
                    {selectedStudents.includes(person) && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                    )}
                    <input
                      type="checkbox"
                      className="absolute left-4 sm:left-10 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                      value={person.email}
                      checked={selectedStudents.includes(person)}
                      onChange={(e) =>
                        setSelectedStudents(
                          e.target.checked
                            ? [...selectedStudents, person]
                            : selectedStudents.filter((p) => p !== person)
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
                                  onClick={() => {
                                    setSelect(person);
                                    setSelectOne(true);
                                    setDeleteSelected(false);
                                  }}
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
          </div>
          <div
            className={`flex justify-center mt-14 pb-10 ${
              students.length < 5 && "mt-28"
            }`}
          >
            <Pagination
              pageCount={metadata?.totalPages}
              pageRangeDisplayed={3}
              currentPage={page || 1}
              marginPagesDisplayed={2}
              onPageChange={(page) => {
                handleFetch({ page, sort });
              }}
            />
            <DeletStudentModal
              deleteAll={deleteAll}
              selectedStudents={selectedStudents}
              isSingle={selectOne}
              singleStudent={select}
              onClose={onDeleteClose}
              open={selectOne || deleteSelected}
              refresh={() => {
                handleFetch({ page, sort });
              }}
            />
            <AddStudentModal open={addStudent} setOpen={setAddStudent} />
          </div>
        </div>
      ) : (
        Empty
      )}
    </>
  );
};

export default StudentsList;
