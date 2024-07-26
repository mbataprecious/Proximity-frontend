import AuthWrapper from "@/components/Layouts/AuthWrapper";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { jwtDecode } from "jwt-decode";
import React from "react";

export const metadata = {
  title: "Proximity - Reset Password",
};

const ResetPassword = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (!searchParams?.token) { throw Error("invalid token") }
  const decodedToken = jwtDecode(searchParams?.token as string);
  console.log({ decodedToken });
  const expiry = Number(decodedToken.exp) * 1000;
  if (Date.now() > expiry) { throw Error("invalid token") }

  return (
    <AuthWrapper>
      <ResetPasswordForm token={searchParams?.token as string} />
    </AuthWrapper>
  );
};

export default ResetPassword;
