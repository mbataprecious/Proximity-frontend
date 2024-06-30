import LecturerLayout from "@/components/Layouts/LecturerLayout";
import React from "react";
import Client, { AddStudentButton } from "./client";

export default function () {
  return (
    <LecturerLayout sideContent={<AddStudentButton />}>
      <Client />
    </LecturerLayout>
  );
}
