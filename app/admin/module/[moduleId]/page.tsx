import LecturerLayout from "@/components/Layouts/LecturerLayout";
import React from "react";
import Client from "./client";
import { getSingleModule, getStudentAndSession } from "@/data/fetchers";

export default async function ({ params }: { params: { moduleId: string } }) {
  const data = await getSingleModule(params.moduleId);
  const { studentsList, sessionsList } = await getStudentAndSession(
    params.moduleId
  );
  console.log({ studentsList, sessionsList });
  return (
    <LecturerLayout>
      <Client
        moduleDetails={data}
        studentsList={studentsList}
        sessionsList={sessionsList}
      />
    </LecturerLayout>
  );
}
