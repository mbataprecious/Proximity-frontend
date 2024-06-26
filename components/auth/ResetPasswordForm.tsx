"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../formControls/Input";
import Button from "../Button";
import { yupResolver } from "@/utils/helpers";
import SvgIconStyle from "../SvgIconStyle";
import { newPasswordSchema } from "@/validations/forgotpasswordSchema";

const ResetPasswordForm = () => {
  const defaultValues = {
    password: "",
    confirmPassword: "",
  };
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(newPasswordSchema) : undefined,
    defaultValues,
  });
  const onSubmit = async (data: typeof defaultValues) => {
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
        <h3 className="font-bold text-[1.75rem]">Update Password</h3>
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
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
