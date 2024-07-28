"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { yupResolver } from "@/utils/helpers";
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
  SignupSchema,
  SignupSchemaType,
} from "@/validations/signUpSchema";
import SvgIconStyle from "../../../components/SvgIconStyle";
import { Input } from "@/components/formControls/Input";
import { useRouter } from "next-nprogress-bar";
import useClientSession from "@/hooks/useClientSession";
import useAuthRequest from "@/hooks/useAuthRequest";
import toast from "react-hot-toast";
import { setSession } from "@/utils/authsession";

export default function () {
  const { logout, session } = useClientSession();
  const router = useRouter();
  const { request } = useAuthRequest();
  const methodsName = useForm({
    mode: "onChange",
    resolver: yupResolver
      ? yupResolver(SignupSchema.pick(["first_name", "last_name"]))
      : undefined,
    defaultValues: {
      first_name: session.user.firstName ?? "",
      last_name: session.user.lastName ?? "",
    },
  });
  const methodsPass = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(ChangePasswordSchema) : undefined,
    defaultValues: {
      password: "",
      oldPassword: "",
    },
  });

  const {
    reset: resetName,
    formState: { isSubmitting: loadingProfile },
  } = methodsName;
  const {
    reset: resetPass,
    formState: { isSubmitting: loadingPass },
  } = methodsPass;

  useEffect(() => {
    resetName({
      first_name: session.user.firstName ?? "",
      last_name: session.user.lastName ?? "",
    });
  }, [session]);

  const onSubmitName = async (
    data: Pick<SignupSchemaType, "first_name" | "last_name">
  ) => {
    try {
      const response = await request.put("/users", {
        firstName: data.first_name,
        lastName: data.last_name,
      });
      if (response) {
        console.log("from profile", { response });

        toast.success(response?.data?.message || "update successful");
        setSession({
          ...session,
          user: {
            ...session.user,
            firstName: data.first_name,
            lastName: data.last_name,
          },
        });
        location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const onSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      const response = await request.put("/users/password", {
        oldPassword: data.oldPassword,
        password: data.password,
      });
      if (response) {
        toast.success(response?.data?.message || "reset successful");
        logout();
        router.push("/login");
      }
      console.log({ data });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div className=" flex flex-col items-center md:justify-center min-h-screen md:min-h-[70vh] px-6 m-auto max-w-[325px]">
      <div className=" flex md:hidden text-[#4A4A4A] w-full justify-center p-5 mb-16">
        {/* <ArrowLeftIcon
          className=" w-6 h-6 cursor-pointer"
          onClick={() => router.back()}
        /> */}
        <h3 className=" font-bold text-xl ">Profile</h3>
        <p />
      </div>
      <div className=" md:py-8">
        <FormProvider {...methodsName}>
          <form
            method="post"
            className=" grid grid-cols-1 gap-y-3"
            onSubmit={methodsName.handleSubmit(onSubmitName)}
          >
            <p className=" text-xl font-semibold text-[#242B33]">
              Personal Information
            </p>
            <div className="w-full">
              <Input
                type="text"
                icon={
                  <SvgIconStyle
                    src="/Assets/svg/person-Icons.svg"
                    className=" text-[#667479]"
                  />
                }
                name="first_name"
                placeholder="First Name"
                required={true}
              />
            </div>
            <div className="w-full">
              <Input
                type="text"
                icon={
                  <SvgIconStyle
                    src="/Assets/svg/person-Icons.svg"
                    className=" text-[#667479]"
                  />
                }
                name="last_name"
                placeholder="Last Name"
                required={true}
              />
            </div>
            <Button
              loading={loadingProfile}
              disabled={loadingProfile}
              className="w-full"
              type="submit"
            >
              Update Profile
            </Button>
          </form>
        </FormProvider>
        <FormProvider {...methodsPass}>
          <form
            method="post"
            className=" grid grid-cols-1 mt-5 gap-y-3"
            onSubmit={methodsPass.handleSubmit(onSubmit)}
          >
            <p className=" text-xl font-semibold text-[#242B33]">
              Update Password
            </p>
            <div className="w-full">
              <Input
                type="password"
                icon={
                  <SvgIconStyle
                    src="/Assets/svg/lock-Icons.svg"
                    className=" text-[#667479]"
                  />
                }
                name="oldPassword"
                placeholder="Current Password"
                required={true}
              />
            </div>
            <div className="w-full">
              <Input
                type="password"
                icon={
                  <SvgIconStyle
                    src="/Assets/svg/lock-Icons.svg"
                    className=" text-[#667479]"
                  />
                }
                name="password"
                placeholder="New Password"
                required={true}
              />
            </div>
            <Button
              loading={loadingPass}
              disabled={loadingPass}
              className="w-full"
              type="submit"
            >
              Update Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
