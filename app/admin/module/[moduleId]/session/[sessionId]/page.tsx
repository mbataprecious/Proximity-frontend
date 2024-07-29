import LecturerLayout from "@/components/Layouts/LecturerLayout";
import React from "react";
import Client from "./client";
import {
  getAttendanceBySession,
  getSingleModule,
  getSingleSession,
} from "@/data/fetchers";
import { ExportAttendanceButton } from "@/components/ExportAttendanceButton";

const page = async ({
  params,
  searchParams,
}: {
  params: { sessionId: string; moduleId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const moduleData = await getSingleModule(params.moduleId);
  const sessionData = await getSingleSession(params.moduleId, params.sessionId);
  const sessionAttendance = await getAttendanceBySession({
    sessionId: params.sessionId,
    filterBy: searchParams?.filterBy as string,
    keyword: searchParams.keyword as string,
    page: searchParams?.page ? parseInt(searchParams?.page as string) : 1,
  });
  return (
    <LecturerLayout
      sideContent={
        <ExportAttendanceButton
          moduleData={moduleData}
          sessionData={sessionData}
        />
      }
    >
      <Client
        moduleData={moduleData}
        sessionData={sessionData}
        sessionAttendance={sessionAttendance}
      />
    </LecturerLayout>
  );
};

export default page;
