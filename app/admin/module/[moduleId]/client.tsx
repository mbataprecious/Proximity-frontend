"use client";
import Button from "@/components/Button";
import SvgIconStyle from "@/components/SvgIconStyle";
import AddStudentModal from "@/components/module/AddStudentModal";
import SessionList from "@/components/module/SessionList";
import StudentsList from "@/components/module/StudentsList";
import { getSearchParamsObject } from "@/utils/helpers";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const tabList = [
  { label: "Student List", value: "student" },
  { label: "Sessions", value: "session" },
];
export default function () {
  const router = useRouter();

  const mounted = useRef(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(searchParams.get("addState") === "true");
  //   const params = useParams<{ moduleId: string }>();
  const tab = searchParams.get("tab") ?? tabList[0].value;
  const addState = searchParams.get("addState");

  useEffect(() => {
    setOpen(addState === "true");
  }, [pathname, searchParams]);

  //   const [tab, setTab] = useState(tabList[0].value);
  return (
    <div>
      <div className=" p-[36px] flex justify-between items-center">
        <div>
          <p className=" py-1 px-2 text-xs bg-[#F0F3F9] rounded-[6px] inline leading-[20px] font-medium text-[rgba(74,74,74,0.8)] ">
            0 Students
          </p>
          <h2 className=" text-4xl font-bold text-[#4A4A4A] mt-3 max-w-[541px]">
            Introduction to computer science
          </h2>
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
        <StudentsList />
      ) : tab === "session" ? (
        <SessionList />
      ) : null}
      <AddStudentModal open={open} setOpen={setOpen} />
    </div>
  );
}

export const AddStudentButton = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ moduleId: string }>();
  const searchObject = getSearchParamsObject(searchParams);

  return (
    <div>
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
          <Button size={"sm"} className=" mx-3 my-2.5 flex items-center">
            <SvgIconStyle src="/Assets/svg/plus-Icons.svg" className=" mr-1" />
            Add Student
          </Button>
        </Link>
      )}
    </div>
  );
};
