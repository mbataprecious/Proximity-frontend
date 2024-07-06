"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { yupResolver } from "@/utils/helpers";
import { SignupSchema, SignupSchemaType } from "@/validations/signUpSchema";
import SvgIconStyle from "../../../components/SvgIconStyle";
import { Input } from "@/components/formControls/Input";

export default function () {
  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    role: { label: "", value: "" },
    password: "",
    confirmPassword: "",
  };
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(SignupSchema) : undefined,
    defaultValues,
  });
  const onSubmit = async (data: SignupSchemaType) => {
    try {
      console.log({ data });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div className=" flex justify-center items-center h-[70vh] px-6 m-auto max-w-[325px]">
      <div className="">
        <FormProvider {...methods}>
          <form
            method="post"
            className=" grid grid-cols-1 gap-y-3"
            onSubmit={methods.handleSubmit(onSubmit)}
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
                name="firstname"
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
                name="lastname"
                placeholder="Last Name"
                required={true}
              />
            </div>
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
                name="password"
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
                name="confirmPassword"
                placeholder="New Password"
                required={true}
              />
            </div>
            <Button className="w-full" type="submit">
              Update
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
