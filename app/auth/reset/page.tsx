import AuthWrapper from "@/components/Layouts/AuthWrapper";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import React from "react";

export const metadata = {
  title: "Proximity - Reset Password",
};

const ResetPassword = () => {
  return (
    <AuthWrapper>
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default ResetPassword;
