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
import useAuthRequest from "@/hooks/useAuthRequest";
import toast from "react-hot-toast";
import { useRouter } from "next-nprogress-bar";
import { XiorError } from "xior";

const RegisterForm = () => {
  const router = useRouter();
  const { request } = useAuthRequest();
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

  const {
    formState: { isSubmitting, errors },
  } = methods;
  console.log({ errors });
  const onSubmit = async (data: SignupSchemaType) => {
    try {
      const response = await request.post("/auth/register", {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        role: data.role.value,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      if (response) {
        router.push("/check-mail");
        toast.success("Successfully created!");
      }

      console.log({ data });
    } catch (error) {
      if (error instanceof XiorError) {
        toast.error(error?.response?.data.message as string);
      } else {
        toast.error((error as { message: string })?.message);
      }
      console.error(error);
    } finally {
    }
  };

  return (
    <div className=" mx-auto px-6 py-6 md:max-w-[436px]">
      <div className="text-[#242B33] mb-9 w-full">
        <h3 className="font-bold text-[1.75rem]">Welcome to Proximity !</h3>
        <p className=" text-xs mt-1">
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
                  <Link
                    href={"/terms-and-conditions"}
                    className=" hover:underline cursor-pointer"
                  >
                    Terms of use and Privacy Policy
                  </Link>
                }
              />
            </div>
            <Button
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </FormProvider>
        <p className="text-[#667479] text-center text-sm mt-3">
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
