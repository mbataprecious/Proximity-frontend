import AuthWrapper from "@/components/Layouts/AuthWrapper";
import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

export const metadata = {
  title: "Proximity - Sign Up",
};
const SignUp = () => {
  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  );
};

export default SignUp;
