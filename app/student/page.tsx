import StudentLayout from "@/components/Layouts/StudentLayout";
import React from "react";
import Client from "./client";

const StudentHome = () => {
  return (
    <StudentLayout>
      <div className=" mx-auto flex justify-center items-center min-h-screen  md:min-h-[70vh] max-w-[416px]">
        <Client />
      </div>
    </StudentLayout>
  );
};

export default StudentHome;
