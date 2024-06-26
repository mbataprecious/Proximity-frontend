import AuthWrapper from "@/components/AuthWrapper";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import React from "react";

export const metadata = {
  title: "Proximity - Forgot Password",
};

const ResetPassword = () => {
  return (
    <AuthWrapper>
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default ResetPassword;
