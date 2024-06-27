"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../formControls/Input";
import Button from "../Button";
import { yupResolver } from "@/utils/helpers";
import { SignupSchema, SignupSchemaType } from "@/validations/signUpSchema";
import { CustomSelect } from "../formControls/CustomReactSelect";
import SvgIconStyle from "../SvgIconStyle";
import Link from "next/link";
import { Checkbox2 } from "../formControls/checkboxes/checkbox2";

const RegisterForm = () => {
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
    <div className=" mx-auto px-6 md:max-w-[436px]">
      <div className="text-[#242B33] mb-12 w-full">
        <h3 className="font-bold text-[1.75rem]">Welcome to Proximity !</h3>
        <p className=" text-xs mt-2">
          Your journey to better attendance management starts here.
        </p>
      </div>
      <div>
        <FormProvider {...methods}>
          <form
            method="post"
            className=" grid grid-cols-1 gap-y-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
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
                placeholder="First Name"
                required={true}
              />
            </div>
            <div className="w-full">
              <Input
                type="email"
                icon={
                  <SvgIconStyle
                    src="/Assets/svg/Mail-Icons.svg"
                    className=" text-[#667479]"
                  />
                }
                name="email"
                placeholder="Email Address"
                required={true}
              />
            </div>
            <div className="w-full">
              <CustomSelect
                label=""
                name="role"
                placeholder="Role"
                options={[
                  { label: "Lecturer", value: "lecturer" },
                  { label: "Student", value: "student" },
                ]}
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
                placeholder="Password"
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
                placeholder="Confirm Password"
                required={true}
              />
            </div>
            <div>
              <Checkbox2
                name="acceptedTermsAndConditions"
                extraCSS="text-sm text-primary"
                label={"I accept Proximity's"}
                subtitle={
                  <span
                    className=" hover:underline cursor-pointer"
                    onClick={() => {}}
                  >
                    Terms of use and Privacy Policy
                  </span>
                }
              />
            </div>
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </form>
        </FormProvider>
        <p className="text-[#667479] text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-center text-sm text-primary hover:underline"
          >
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
