import AuthWrapper from "@/components/Layouts/AuthWrapper";
import ForgotForm from "@/components/auth/ForgotForm";
import React from "react";

export const metadata = {
  title: "Proximity - Forgot Password",
};

const Forgot = () => {
  return (
    <AuthWrapper>
      <ForgotForm />
    </AuthWrapper>
  );
};

export default Forgot;
