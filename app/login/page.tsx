import AuthWrapper from "@/components/Layouts/AuthWrapper";
import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export const metadata = {
  title: "Proximity - Login",
};

const Login = () => {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
};

export default Login;
