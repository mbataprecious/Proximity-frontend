"use client";
import Button from "@/components/Button";
import ModuleDetailBox from "@/components/ModuleDetailBox";
import SvgIconStyle from "@/components/SvgIconStyle";
import SessionList from "@/components/module/SessionList";
import StudentsList from "@/components/module/StudentsList";
import { getSearchParamsObject } from "@/utils/helpers";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const tabList = [
  { label: "Student List", value: "student" },
  { label: "Sessions", value: "session" },
];

interface Props {
  moduleDetails: IModule;
  studentsList: IStudentList;
  sessionsList: ISessionList;
}

export default function ({ moduleDetails, studentsList, sessionsList }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(searchParams.get("addState") === "true");
  const [totalStudents, setTotalStudents] = useState(
    studentsList?.metadata?.totalDocuments
  );
  const tab = searchParams.get("tab") ?? tabList[0].value;

  useEffect(() => {
    const addState = searchParams.get("addState");
    setOpen(addState === "true");
  }, [pathname, searchParams]);

  //   const [tab, setTab] = useState(tabList[0].value);
  return (
    <div>
      <div className=" p-[36px] flex justify-between items-center max-[700px]:flex-col max-[700px]:gap-5">
        <div>
          <p className=" py-1 px-2 text-xs bg-[#F0F3F9] rounded-[6px] inline leading-[20px] font-medium text-[rgba(74,74,74,0.8)] ">
            {totalStudents} Students
          </p>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#4A4A4A] mt-3 max-w-[541px]">
            {moduleDetails.title}
          </h2>
        </div>

        <ModuleDetailBox details={moduleDetails} />
      </div>
      <div className=" px-2">
        <div className="pl-[98px] flex pt-4 border-b-2 border-[#E5E7EB]">
          {tabList.map(({ label, value }) => {
            return (
              <Link
                href={{
                  pathname,
                  query: { tab: value },
                }}
                key={label}
                className={`pb-4 w-[160px] cursor-pointer -my-0.5 border-b-2 ${
                  tab === value
                    ? "border-b-[#0D5CC7] font-medium text-[#0D5CC7]"
                    : " border-b-transparent text-[#4A4A4A]"
                } `}
              >
                <div className="flex justify-center items-center">
                  <span className=" ml-0.5">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {tab === "student" ? (
        <StudentsList studentsList={studentsList} setTotal={setTotalStudents} />
      ) : tab === "session" ? (
        <SessionList sessionsList={sessionsList} />
      ) : null}
    </div>
  );
}

export const AddStudentButton = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ moduleId: string }>();
  const searchObject = getSearchParamsObject(searchParams);

  return (
    <div >
      {searchObject?.["tab"] !== "session" && (
        <Link
          href={{
            pathname: params.moduleId,
            query: {
              ...searchObject,
              addState: "true",
            },
          }}
        >
          <Button size={"sm"} className=" mx-3 flex items-center">
            <SvgIconStyle src="/Assets/svg/plus-Icons.svg" className=" mr-1" />
            Add Student
          </Button>
        </Link>
      )}
    </div>
  );
};
