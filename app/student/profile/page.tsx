import Client from "@/app/admin/profile/client";
import StudentLayout from "@/components/Layouts/StudentLayout";
import React from "react";

const ProfilePage = () => {
  return (
    <StudentLayout>
      <Client />
    </StudentLayout>
  );
};

export default ProfilePage;
