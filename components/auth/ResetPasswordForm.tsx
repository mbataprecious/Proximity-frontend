"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../formControls/Input";
import Button from "../Button";
import { yupResolver } from "@/utils/helpers";
import SvgIconStyle from "../SvgIconStyle";
import { newPasswordSchema } from "@/validations/forgotpasswordSchema";
import { useRouter } from "next-nprogress-bar";
import useAuthRequest from "@/hooks/useAuthRequest";
import toast from "react-hot-toast";
import { XiorError } from "xior";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const { request } = useAuthRequest();
  const defaultValues = {
    password: "",
    confirmPassword: "",
  };
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(newPasswordSchema) : undefined,
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const response = await request.put(
        "/auth/password",
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        {
          params: {
            token,
          },
        }
      );
      if (response) {
        toast.success(response?.data?.message || "reset successful");
        router.push("/login");
      }
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
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
              type="submit"
            >
              Reset Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
