import LecturerLayout from "@/components/Layouts/LecturerLayout";
import React from "react";
import Client, { AddStudentButton } from "./client";
import { getSingleModule, getStudentAndSession } from "@/data/fetchers";

export default async function ({ params }: { params: { moduleId: string } }) {
  const data = await getSingleModule(params.moduleId);
  const { studentsList, sessionsList } = await getStudentAndSession(
    params.moduleId
  );
  console.log({ studentsList, sessionsList });
  return (
    <LecturerLayout sideContent={<AddStudentButton />}>
      <Client
        moduleDetails={data}
        studentsList={studentsList}
        sessionsList={sessionsList}
      />
    </LecturerLayout>
  );
}
