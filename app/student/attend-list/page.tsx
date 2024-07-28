import StudentLayout from "@/components/Layouts/StudentLayout";
import React from "react";
import Client from "./client";
import { getStudentAttendance } from "@/data/fetchers";

const headers = ["Module Title", "Module code", "Time"];

const AttendList = async () => {
  const attendList = await getStudentAttendance();
  return (
    <StudentLayout>
      <Client attendList={attendList} />
    </StudentLayout>
  );
};

export default AttendList;
